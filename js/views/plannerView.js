window.App = window.App || {};

window.App.renderPlannerView = function renderPlannerView(state) {
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'plannerView-title');
  section.innerHTML =
    '<header class="view-card__header">' +
    '<p class="view-card__eyebrow">Planning</p>' +
    '<h2 id="plannerView-title">Planner</h2>' +
    '<p>Plan income, incoming bills, and month-to-month budget expectations.</p>' +
    '</header>' +
    '<div class="placeholder-grid" data-placeholder-grid></div>';

  const grid = section.querySelector('[data-placeholder-grid]');
  grid.append(
    window.App.createEmptyState('Planned income', 'Placeholder for month ' + state.currentMonth + '.'),
    window.App.createEmptyState('Incoming bills', 'This area will be wired to shared remote data in a later milestone.'),
    window.App.createEmptyState('Month imports', 'Accessible controls and validation will be added as the feature is rebuilt.')
  );

  return section;
};
