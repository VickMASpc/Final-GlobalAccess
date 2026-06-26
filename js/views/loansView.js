import { getLoanMonthsLeft } from '../core/calculations.js';
import { formatCurrency } from '../core/formatters.js';

export function renderLoansView(state) {
  const month = state.months[state.app.currentMonth];
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'loans-title');
  section.innerHTML = `<header class="view-card__header"><p class="view-card__eyebrow">Debt</p><h2 id="loans-title">Loans</h2><p>Loan payoff estimates are calculated from state.</p></header><div class="placeholder-grid"></div>`;
  const grid = section.querySelector('.placeholder-grid');
  month.loans.forEach((loan) => {
    const panel = document.createElement('article');
    panel.className = 'placeholder-panel';
    panel.innerHTML = `<h3>${loan.name}</h3><p>${formatCurrency(loan.amountLeft)} left</p><p>${getLoanMonthsLeft(loan)} month(s) remaining</p>`;
    grid.append(panel);
  });
  return section;
}
