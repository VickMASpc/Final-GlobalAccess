import { formatCurrency } from '../core/formatters.js';
import { createKeyValueTable } from '../components/table.js';

export function renderDashboardView(state) {
  const month = state.months[state.app.currentMonth];
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'dashboard-title');
  section.innerHTML = `<header class="view-card__header"><p class="view-card__eyebrow">Overview</p><h2 id="dashboard-title">Dashboard</h2><p>Sample state-driven dashboard for ${state.app.currentMonth}. Values render from the store, not from DOM scraping.</p></header>`;
  section.append(createKeyValueTable([
    { label: 'Actual income', value: formatCurrency(month.extractTotals.actualIncomeTotal) },
    { label: 'Total expenses', value: formatCurrency(month.extractTotals.totalExpenses) },
    { label: 'Final balance', value: formatCurrency(month.extractTotals.finalBalance) },
    { label: 'Sync state', value: state.sync.message },
  ]));
  return section;
}
