window.App = window.App || {};

window.App.sumAmounts = function sumAmounts(items = []) {
  return items.reduce((total, item) => total + (Number(item.amount) || 0), 0);
};

window.App.calculateBalance = function calculateBalance(income = [], expenses = []) {
  return window.App.sumAmounts(income) - window.App.sumAmounts(expenses);
};
