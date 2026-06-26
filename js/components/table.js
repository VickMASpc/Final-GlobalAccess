window.App = window.App || {};

window.App.createPlaceholderTable = function createPlaceholderTable(message) {
  const wrapper = document.createElement('div');
  wrapper.className = 'placeholder-panel';
  wrapper.innerHTML = `<h3>Table module ready</h3><p>${message}</p>`;
  return wrapper;
};
