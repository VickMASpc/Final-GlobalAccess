window.App = window.App || {};

window.App.renderLoansView = function renderLoansView(state) {
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'loansView-title');
  section.innerHTML =
    '<header class="view-card__header">' +
    '<p class="view-card__eyebrow">Debt</p>' +
    '<h2 id="loansView-title">Loans</h2>' +
    '<p>Track long-lasting expenses, remaining balances, and payoff estimates.</p>' +
    '</header>' +
    '<div class="placeholder-grid" data-placeholder-grid></div>';

  const grid = section.querySelector('[data-placeholder-grid]');
  grid.append(
    window.App.createEmptyState('Loan balances', 'Placeholder for month ' + state.currentMonth + '.'),
    window.App.createEmptyState('Monthly payments', 'This area will be wired to shared remote data in a later milestone.'),
    window.App.createEmptyState('Payoff estimate', 'Accessible controls and validation will be added as the feature is rebuilt.')
  );

  return section;
};
