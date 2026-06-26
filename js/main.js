window.App = window.App || {};

(function init(App) {
  function initializeApp() {
    App.subscribe(App.renderShell);
    App.bindAppEvents();

    const syncStatus = App.getSyncStatus();
    App.setState({
      sync: {
        status: syncStatus.connected ? 'connected' : 'not-connected',
        message: syncStatus.connected ? 'Remote datastore connected' : 'Remote datastore not connected yet',
      },
    });
  }

  document.addEventListener('DOMContentLoaded', initializeApp);
})(window.App);
