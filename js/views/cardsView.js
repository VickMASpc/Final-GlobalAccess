window.App = window.App || {};

window.App.renderCardsView = function renderCardsView(state) {
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'cardsView-title');
  section.innerHTML =
    '<header class="view-card__header">' +
    '<p class="view-card__eyebrow">Credit</p>' +
    '<h2 id="cardsView-title">Credit Cards</h2>' +
    '<p>Manage card accounts, installment purchases, and monthly card bills.</p>' +
    '</header>' +
    '<div class="placeholder-grid" data-placeholder-grid></div>';

  const grid = section.querySelector('[data-placeholder-grid]');
  grid.append(
    window.App.createEmptyState('Card accounts', 'Placeholder for month ' + state.currentMonth + '.'),
    window.App.createEmptyState('Installments', 'This area will be wired to shared remote data in a later milestone.'),
    window.App.createEmptyState('Card bill status', 'Accessible controls and validation will be added as the feature is rebuilt.')
  );

  return section;
};
