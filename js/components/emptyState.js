window.App = window.App || {};

window.App.createEmptyState = function createEmptyState(title, message) {
  const panel = document.createElement('article');
  panel.className = 'placeholder-panel';
  panel.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
  return panel;
};
