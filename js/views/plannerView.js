export function renderPlannerView(state) {
  const month = state.months[state.app.currentMonth];
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'planner-title');
  section.innerHTML = `<header class="view-card__header"><p class="view-card__eyebrow">Planning</p><h2 id="planner-title">Planner</h2><p>Edit sample planned income below. Changes dispatch to state first, then the view re-renders.</p></header><div class="record-list"></div>`;
  const list = section.querySelector('.record-list');
  month.plannedIncome.forEach((item) => {
    const row = document.createElement('article');
    row.className = 'record-card';
    row.innerHTML = `
      <label>Source<input value="${item.source}" data-action="plannedIncome/update" data-id="${item.id}" data-field="source"></label>
      <label>Amount<input type="number" value="${item.amount}" data-action="plannedIncome/update" data-id="${item.id}" data-field="amount"></label>
      <label class="checkbox-row"><input type="checkbox" ${item.received ? 'checked' : ''} data-action="plannedIncome/update" data-id="${item.id}" data-field="received"> Received</label>
    `;
    list.append(row);
  });
  return section;
}
