window.App = window.App || {};

window.App.renderShell = function renderShell(state) {
  const root = document.querySelector('#view-root');
  const monthSelector = document.querySelector('#month-selector');
  const statusText = document.querySelector('#workspace-status-text');
  const statusDot = document.querySelector('.status-dot');
  const loadingState = document.querySelector('#loading-state');

  if (!root) return;

  if (monthSelector && monthSelector.value !== state.currentMonth) {
    monthSelector.value = state.currentMonth;
  }

  if (statusText) statusText.textContent = state.sync.message;
  statusDot?.classList.toggle('status-dot--ready', state.sync.status === 'connected');
  statusDot?.classList.toggle('status-dot--pending', state.sync.status !== 'connected');

  if (loadingState) loadingState.hidden = !state.isLoading;
  root.setAttribute('aria-busy', String(state.isLoading));

  window.App.setActiveNav(state.currentView);

  const viewRenderers = {
    dashboard: window.App.renderDashboardView,
    planner: window.App.renderPlannerView,
    expenses: window.App.renderExpensesView,
    cards: window.App.renderCardsView,
    loans: window.App.renderLoansView,
    extract: window.App.renderExtractView,
    settings: window.App.renderSettingsView,
  };

  const renderer = viewRenderers[state.currentView] || window.App.renderDashboardView;
  root.replaceChildren(renderer(state));
};
