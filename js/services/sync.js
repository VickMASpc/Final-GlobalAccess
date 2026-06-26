window.App = window.App || {};

window.App.getSyncStatus = function getSyncStatus() {
  return window.App.getFirebaseStatus();
};
