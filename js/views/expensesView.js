window.App = window.App || {};

window.App.renderExpensesView = function renderExpensesView(state) {
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'expensesView-title');
  section.innerHTML =
    '<header class="view-card__header">' +
    '<p class="view-card__eyebrow">Spending</p>' +
    '<h2 id="expensesView-title">Expenses</h2>' +
    '<p>Track received income plus fixed, semi-fixed, and extra expenses.</p>' +
    '</header>' +
    '<div class="placeholder-grid" data-placeholder-grid></div>';

  const grid = section.querySelector('[data-placeholder-grid]');
  grid.append(
    window.App.createEmptyState('Received income', 'Placeholder for month ' + state.currentMonth + '.'),
    window.App.createEmptyState('Expense categories', 'This area will be wired to shared remote data in a later milestone.'),
    window.App.createEmptyState('Expense totals', 'Accessible controls and validation will be added as the feature is rebuilt.')
  );

  return section;
};
