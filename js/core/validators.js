window.App = window.App || {};

window.App.isValidMonth = function isValidMonth(value) {
  return /^\d{4}-\d{2}$/.test(value);
};

window.App.toNumber = function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};
