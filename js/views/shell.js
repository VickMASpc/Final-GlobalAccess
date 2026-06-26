import { setActiveNav } from '../components/tabs.js';
import { formatSyncStatus } from '../core/formatters.js';
import { renderDashboardView } from './dashboardView.js';
import { renderPlannerView } from './plannerView.js';
import { renderExpensesView } from './expensesView.js';
import { renderCardsView } from './cardsView.js';
import { renderLoansView } from './loansView.js';
import { renderExtractView } from './extractView.js';
import { renderSettingsView } from './settingsView.js';

const viewRenderers = {
  dashboard: renderDashboardView,
  planner: renderPlannerView,
  expenses: renderExpensesView,
  cards: renderCardsView,
  loans: renderLoansView,
  extract: renderExtractView,
  settings: renderSettingsView,
};

export function renderShell(state) {
  const root = document.querySelector('#view-root');
  const monthSelector = document.querySelector('#month-selector');
  const statusText = document.querySelector('#workspace-status-text');
  const statusDot = document.querySelector('.status-dot');
  const loadingState = document.querySelector('#loading-state');

  if (!root) return;

  if (monthSelector && monthSelector.value !== state.app.currentMonth) monthSelector.value = state.app.currentMonth;
  if (statusText) statusText.textContent = `${formatSyncStatus(state.sync.status)} — ${state.sync.message}`;
  statusDot?.setAttribute('data-sync-status', state.sync.status);
  if (loadingState) loadingState.hidden = !state.app.isLoading;
  root.setAttribute('aria-busy', String(state.app.isLoading));
  setActiveNav(state.app.currentView);

  const renderer = viewRenderers[state.app.currentView] || renderDashboardView;
  root.replaceChildren(renderer(state));
}
