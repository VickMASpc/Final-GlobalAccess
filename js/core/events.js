import { dispatch, getState } from './state.js';
import { VIEWS } from './schema.js';
import { showToast } from '../components/toast.js';
import { scheduleCurrentMonthSave } from '../services/sync.js';

function dispatchAndSave(action) {
  dispatch(action);
  scheduleCurrentMonthSave(getState());
}

export function bindAppEvents() {
  const nav = document.querySelector('.primary-nav');
  const monthSelector = document.querySelector('#month-selector');

  nav?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-view]');
    if (!button) return;

    const requestedView = button.dataset.view;
    if (!VIEWS.includes(requestedView)) return;

    dispatch({ type: 'app/setView', view: requestedView });
  });

  nav?.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    const buttons = [...nav.querySelectorAll('[data-view]')];
    const currentIndex = buttons.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    event.preventDefault();
    const lastIndex = buttons.length - 1;
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight') nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    if (event.key === 'ArrowLeft') nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;

    buttons[nextIndex].focus();
    buttons[nextIndex].click();
  });

  monthSelector?.addEventListener('change', (event) => {
    dispatch({ type: 'app/setMonth', monthId: event.target.value });
    showToast(`Planning month changed to ${event.target.value}.`);
  });

  document.querySelector('#view-root')?.addEventListener('input', (event) => {
    const field = event.target.closest('[data-action][data-id][data-field]');
    if (!field) return;

    const value = field.type === 'number' ? Number(field.value) : field.value;
    dispatchAndSave({
      type: field.dataset.action,
      id: field.dataset.id,
      patch: { [field.dataset.field]: value },
    });
  });

  document.querySelector('#view-root')?.addEventListener('change', (event) => {
    const field = event.target.closest('[data-action][data-id][data-field]');
    if (!field || field.type !== 'checkbox') return;

    dispatchAndSave({
      type: field.dataset.action,
      id: field.dataset.id,
      patch: { [field.dataset.field]: field.checked },
    });
  });
}
