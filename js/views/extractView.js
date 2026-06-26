import { formatCurrency } from '../core/formatters.js';
import { createKeyValueTable } from '../components/table.js';

export function renderExtractView(state) {
  const totals = state.months[state.app.currentMonth].extractTotals;
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'extract-title');
  section.innerHTML = `<header class="view-card__header"><p class="view-card__eyebrow">Reporting</p><h2 id="extract-title">Extract</h2><p>Budget extract totals are calculated from canonical records.</p></header>`;
  section.append(createKeyValueTable([
    { label: 'Planned income', value: formatCurrency(totals.plannedIncomeTotal) },
    { label: 'Actual income', value: formatCurrency(totals.actualIncomeTotal) },
    { label: 'Planned bills', value: formatCurrency(totals.plannedBillsTotal) },
    { label: 'Fixed expenses', value: formatCurrency(totals.fixedExpensesTotal) },
    { label: 'Semi-fixed expenses', value: formatCurrency(totals.semiFixedExpensesTotal) },
    { label: 'Extra expenses', value: formatCurrency(totals.extraExpensesTotal) },
    { label: 'Final balance', value: formatCurrency(totals.finalBalance) },
  ]));
  return section;
}
