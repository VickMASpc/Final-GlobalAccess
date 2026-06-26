window.App = window.App || {};

window.App.clearModal = function clearModal() {
  const root = document.querySelector('#modal-root');
  if (root) root.replaceChildren();
};
