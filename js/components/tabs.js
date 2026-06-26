export function setActiveNav(currentView) {
  document.querySelectorAll('[data-view]').forEach((button) => {
    const isActive = button.dataset.view === currentView;
    button.toggleAttribute('aria-current', isActive);
    if (isActive) button.setAttribute('aria-current', 'page');
  });
}
