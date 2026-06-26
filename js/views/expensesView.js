import { formatCurrency } from '../core/formatters.js';

export function renderExpensesView(state) {
  const month = state.months[state.app.currentMonth];
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'expenses-title');
  section.innerHTML = `<header class="view-card__header"><p class="view-card__eyebrow">Spending</p><h2 id="expenses-title">Expenses</h2><p>Expenses are rendered from state for ${state.app.currentMonth}.</p></header><div class="placeholder-grid"></div>`;
  const grid = section.querySelector('.placeholder-grid');
  month.expenses.forEach((expense) => {
    const card = document.createElement('article');
    card.className = 'placeholder-panel';
    card.innerHTML = `<h3>${expense.description}</h3><p>${expense.category}: ${formatCurrency(expense.amount)}</p>`;
    grid.append(card);
  });
  return section;
}
