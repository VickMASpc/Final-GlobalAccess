window.App = window.App || {};

window.App.renderExtractView = function renderExtractView(state) {
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'extractView-title');
  section.innerHTML =
    '<header class="view-card__header">' +
    '<p class="view-card__eyebrow">Reporting</p>' +
    '<h2 id="extractView-title">Extract</h2>' +
    '<p>Review the calculated budget extract and final balance for the selected month.</p>' +
    '</header>' +
    '<div class="placeholder-grid" data-placeholder-grid></div>';

  const grid = section.querySelector('[data-placeholder-grid]');
  grid.append(
    window.App.createEmptyState('Income summary', 'Placeholder for month ' + state.currentMonth + '.'),
    window.App.createEmptyState('Expense summary', 'This area will be wired to shared remote data in a later milestone.'),
    window.App.createEmptyState('Final balance', 'Accessible controls and validation will be added as the feature is rebuilt.')
  );

  return section;
};
