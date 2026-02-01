angular.module('myAppChatService', ['myApp'])
  .factory('chatService', ['API_BASE_URL', function (API_BASE_URL) {

    function getAuthStr() {
      const token = (window.userSession && window.userSession.token) ? window.userSession.token : (() => {
        try {
          const raw = localStorage.getItem("userSession");
          return raw ? JSON.parse(raw)?.token : null;
        } catch {
          return null;
        }
      })();

      return token ? 'Bearer '.concat(token) : null;
    }

    function authHeaders() {
      const AuthStr = getAuthStr();
      return AuthStr ? {Authorization: AuthStr} : {};
    }

    return {
      getHistory: async function (postId) {
        return new Promise((resolve) => {
          const url = API_BASE_URL + `/chat/history?postId=${Number(postId)}`;

          axios.get(url, {headers: authHeaders()})
            .then((res) => resolve(res.data.history || []))
            .catch((err) => {
              console.log("[chatService] getHistory error", err);
              resolve([]);
            });
        });
      },

      sendMessage: async function (postId, message) {
        return new Promise((resolve) => {
          const url = API_BASE_URL + `/chat/message`;

          axios.post(url, {postId: Number(postId), message: String(message ?? "")}, {
            headers: {
              ...authHeaders(),
              "Content-Type": "application/json"
            }
          })
            .then((res) => resolve(res.data || {ok: true}))
            .catch((err) => {
              console.log("[chatService] sendMessage error", err);
              resolve({ok: false, error: "send_failed"});
            });
        });
      },

      getAblyToken: async function (postId) {
        return new Promise((resolve) => {
          const url = API_BASE_URL + `/chat/ably-token?postId=${Number(postId)}`;

          axios.get(url, {headers: authHeaders()})
            .then((res) => resolve(res.data))
            .catch((err) => {
              console.log("[chatService] getAblyToken error", err);
              resolve(null);
            });
        });
      },

      ablyAuthCallback: function (postId) {
        return (tokenParams, callback) => {
          const url = API_BASE_URL + `/chat/ably-token?postId=${Number(postId)}`;

          axios.get(url, {headers: authHeaders()})
            .then((res) => callback(null, res.data))
            .catch((err) => callback(err, null));
        };
      }
    };
  }]);
