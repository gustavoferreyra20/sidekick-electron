let chatDomBound = false;
let myName = null;

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function ensureChatDOM() {
  if (!document.getElementById("chatBox")) {
    const box = document.createElement("div");
    box.id = "chatBox";
    box.className = "sk-chat";
    box.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 340px;
      height: 460px;
      z-index: 9999;
      display: none;
    `;

    box.innerHTML = `
      <div class="sk-chat__card">
        <div class="sk-chat__header">
          <div class="sk-chat__title">
            <div class="sk-chat__dot"></div>
            <div>
              <div class="sk-chat__name">Chat</div>
              <div id="chatStatus" class="sk-chat__status">—</div>
            </div>
          </div>

          <button id="closeChatBtn" class="sk-chat__close" type="button" aria-label="Cerrar">✕</button>
        </div>

        <div class="sk-chat__body" id="messages"></div>

        <div class="sk-chat__footer">
          <input id="msgInput" class="sk-chat__input" placeholder="Escribí..." />
          <button id="sendBtn" class="sk-chat__send" type="button">Enviar</button>
        </div>
      </div>
    `;

    document.body.appendChild(box);
  }

  if (chatDomBound) return;
  chatDomBound = true;

  const btnSend = document.getElementById("sendBtn");
  const input = document.getElementById("msgInput");
  const btnClose = document.getElementById("closeChatBtn");

  btnClose?.addEventListener("click", () => window.SidekickChat?.close());

  if (btnSend && input) {
    btnSend.addEventListener("click", () => {
      window.SidekickChat?.send(input.value);
      input.value = "";
      input.focus();
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") btnSend.click();
    });
  }
}

if (!(window.SidekickChat && window.SidekickChat.__initialized)) {
  function decodeJwt(token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(payloadJson);
    } catch {
      return null;
    }
  }

  const Ably = require("ably");

  function getChatServiceSafe() {
    try {
      const injector =
        window.angular?.element(document.body)?.injector?.() ||
        window.angular?.element(document.documentElement)?.injector?.();

      if (!injector) return null;
      return injector.get("chatService");
    } catch {
      return null;
    }
  }

  let ably = null;
  let channel = null;
  let currentPostId = null;

  function log(...args) {
    console.log("[CHAT]", ...args);
  }

  function setStatus(text) {
    const el = document.getElementById("chatStatus");
    if (el) el.textContent = text || "";
  }

  function showChat() {
    const box = document.getElementById("chatBox");
    if (box) box.style.display = "block";
  }

  function hideChat() {
    const box = document.getElementById("chatBox");
    if (box) box.style.display = "none";
  }

  function clearMessagesUI() {
    const wrap = document.getElementById("messages");
    if (wrap) wrap.innerHTML = "";
  }

  function addMessageToUI(m) {
    const wrap = document.getElementById("messages");
    if (!wrap || !m) return;

    const safeName = String(m.user_name ?? "User");
    const safeText = String(m.message ?? "");

    const isMe =
      myName &&
      safeName &&
      safeName.toLowerCase() === String(myName).toLowerCase();

    const el = document.createElement("div");
    el.className =
      "sk-chat__msg " + (isMe ? "sk-chat__msg--me" : "sk-chat__msg--other");

    el.innerHTML = `
      <div class="sk-chat__meta">${escapeHtml(safeName)}</div>
      <div>${escapeHtml(safeText)}</div>
    `;

    wrap.appendChild(el);
    wrap.scrollTop = wrap.scrollHeight;
  }

  function getSessionSafe() {
    if (window.userSession && !Array.isArray(window.userSession)) {
      return window.userSession;
    }
    try {
      const raw = localStorage.getItem("userSession");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function ensureMyNameFromSession() {
    const session = getSessionSafe();
    if (!session) return;

    let nameFromToken = null;
    if (session.token) {
      const payload = decodeJwt(session.token);
      nameFromToken = payload?.name || payload?.user_name || null;
    }

    myName = session.name ?? nameFromToken ?? myName ?? "User";
  }

  async function fetchHistory(postId) {
    const session = getSessionSafe();
    const token = session?.token;
    if (!token) {
      setStatus("Tenés que loguearte");
      return [];
    }

    const chatService = getChatServiceSafe();
    if (!chatService) {
      setStatus("Error conexión");
      log("chatService not available");
      return [];
    }

    try {
      const history = await chatService.getHistory(postId);
      return Array.isArray(history) ? history : [];
    } catch (e) {
      log("history service error", e);
      setStatus("Error conexión");
      return [];
    }
  }

  async function sendMessageViaService(postId, msg) {
    const session = getSessionSafe();
    const token = session?.token;
    if (!token) {
      setStatus("Tenés que loguearte");
      return false;
    }

    const chatService = getChatServiceSafe();
    if (!chatService) {
      setStatus("Error conexión");
      log("chatService not available");
      return false;
    }

    try {
      const resp = await chatService.sendMessage(postId, msg);

      if (resp?.ok === false) {
        setStatus(resp?.error === "forbidden" ? "Sin permisos" : "Error envío");
        return false;
      }

      return true;
    } catch (e) {
      log("send service error", e);
      setStatus("Error conexión");
      return false;
    }
  }

  function disconnectAbly() {
    try { channel?.unsubscribe(); } catch {}
    try { channel?.detach(); } catch {}
    try { ably?.close(); } catch {}
    channel = null;
    ably = null;
  }

  function connectAbly(postId) {
    const session = getSessionSafe();
    const token = session?.token;

    if (!token) {
      setStatus("Tenés que loguearte");
      log("Missing JWT token");
      return false;
    }

    const chatService = getChatServiceSafe();
    if (!chatService) {
      setStatus("Error conexión");
      log("chatService not available");
      return false;
    }

    disconnectAbly();

    setStatus("Conectando...");
    log("connectAbly()", { postId, channel: `post:${postId}` });

    ably = new Ably.Realtime({
      authCallback: chatService.ablyAuthCallback(postId),
    });

    ably.connection.on((stateChange) => {
      log("ably state", stateChange.current, stateChange.reason?.message);
      if (stateChange.current === "connected") setStatus("Conectado");
      if (stateChange.current === "connecting") setStatus("Conectando...");
      if (stateChange.current === "disconnected") setStatus("Desconectado");
      if (stateChange.current === "failed") setStatus("Error conexión");
    });

    channel = ably.channels.get(`post:${postId}`);
    channel.subscribe("message", (msg) => {
      log("recv message", msg.data);
      addMessageToUI(msg.data);
    });

    return true;
  }

  window.SidekickChat = {
    __initialized: true,

    open: async (postId) => {
      ensureChatDOM();
      ensureMyNameFromSession();

      const nextPostId = Number(postId);

      if (currentPostId !== null && currentPostId !== nextPostId) {
        clearMessagesUI();
      }

      currentPostId = nextPostId;

      showChat();
      setStatus("Abriendo...");

      connectAbly(currentPostId);

      clearMessagesUI();
      const history = await fetchHistory(currentPostId);
      history.forEach(addMessageToUI);

      document.getElementById("msgInput")?.focus();
    },

    close: () => {
      hideChat();
      setStatus("");
    },

    resetConnection: () => {
      currentPostId = null;
      clearMessagesUI();
      setStatus("");
      hideChat();
      disconnectAbly();
    },

    send: async (text) => {
      const msg = String(text ?? "").trim();
      if (!msg) return;
      if (!currentPostId) return;

      ensureMyNameFromSession();

      if (!ably || !channel) {
        setStatus("Conectando...");
        connectAbly(currentPostId);
      }

      log("send()", { postId: currentPostId, msg });

      const ok = await sendMessageViaService(currentPostId, msg);
      if (!ok) return;
    },
  };
}
