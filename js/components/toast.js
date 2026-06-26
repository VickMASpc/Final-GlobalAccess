window.App = window.App || {};

window.App.showToast = function showToast(message) {
  const root = document.querySelector('#toast-root');
  if (!root || !message) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  root.append(toast);

  window.setTimeout(() => toast.remove(), 3200);
};
