window.App = window.App || {};

window.App.bindAppEvents = function bindAppEvents() {
  const nav = document.querySelector('.primary-nav');
  const monthSelector = document.querySelector('#month-selector');

  nav?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-view]');
    if (!button) return;

    const requestedView = button.dataset.view;
    if (!window.App.VIEWS.includes(requestedView)) return;

    window.App.setState({ currentView: requestedView });
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
    window.App.setState({ currentMonth: event.target.value });
    window.App.showToast(`Planning month changed to ${event.target.value}.`);
  });
};
