window.App = window.App || {};

window.App.renderDashboardView = function renderDashboardView(state) {
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'dashboardView-title');
  section.innerHTML =
    '<header class="view-card__header">' +
    '<p class="view-card__eyebrow">Overview</p>' +
    '<h2 id="dashboardView-title">Dashboard</h2>' +
    '<p>A high-level landing view for income, expenses, balances, and sync health.</p>' +
    '</header>' +
    '<div class="placeholder-grid" data-placeholder-grid></div>';

  const grid = section.querySelector('[data-placeholder-grid]');
  grid.append(
    window.App.createEmptyState('Monthly snapshot', 'Placeholder for month ' + state.currentMonth + '.'),
    window.App.createEmptyState('Global access', 'This area will be wired to shared remote data in a later milestone.'),
    window.App.createEmptyState('Next actions', 'Accessible controls and validation will be added as the feature is rebuilt.')
  );

  return section;
};
