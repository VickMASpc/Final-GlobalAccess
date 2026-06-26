window.App = window.App || {};

window.App.formatCurrency = function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(value) || 0);
};

window.App.formatViewTitle = function formatViewTitle(value) {
  return value.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
};
