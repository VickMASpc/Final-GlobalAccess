import { formatCurrency } from '../core/formatters.js';
import { getCreditCardMonthlyTotal } from '../core/calculations.js';

export function renderCardsView(state) {
  const month = state.months[state.app.currentMonth];
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'cards-title');
  section.innerHTML = `<header class="view-card__header"><p class="view-card__eyebrow">Credit</p><h2 id="cards-title">Credit Cards</h2><p>Card and installment data comes from the canonical month budget state.</p></header><div class="placeholder-grid"></div>`;
  const grid = section.querySelector('.placeholder-grid');
  month.creditCards.forEach((card) => {
    const panel = document.createElement('article');
    panel.className = 'placeholder-panel';
    panel.innerHTML = `<h3>${card.name}</h3><p>Monthly card total: ${formatCurrency(getCreditCardMonthlyTotal(card))}</p><p>${card.purchases.length} installment purchase(s)</p>`;
    grid.append(panel);
  });
  return section;
}
