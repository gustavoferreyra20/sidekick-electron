// Session restore and IPC listener for Electron
// This must be loaded before Angular modules

// Restore session from localStorage on startup
const session = localStorage.getItem('userSession');
if (session) {
  window.userSession = JSON.parse(session);
}
// Listen for session updates from Electron main process
if (window.require) {
  try {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on('userSession-data', (event, data) => {
      let sessionObj = data;
      if (Array.isArray(data) && data.length > 0 && data[0].value) {
        sessionObj = JSON.parse(data[0].value);
      }
      localStorage.setItem('userSession', JSON.stringify(sessionObj));
      window.userSession = sessionObj;
    });
  } catch (e) {
    console.error('Error loading Electron IPC:', e);
  }
}
