window.App = window.App || {};

window.App.renderSettingsView = function renderSettingsView(state) {
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'settingsView-title');
  section.innerHTML =
    '<header class="view-card__header">' +
    '<p class="view-card__eyebrow">Setup</p>' +
    '<h2 id="settingsView-title">Settings</h2>' +
    '<p>Prepare workspace, datastore, and accessibility preferences for the rebuilt app.</p>' +
    '</header>' +
    '<div class="placeholder-grid" data-placeholder-grid></div>';

  const grid = section.querySelector('[data-placeholder-grid]');
  grid.append(
    window.App.createEmptyState('Workspace', 'Placeholder for month ' + state.currentMonth + '.'),
    window.App.createEmptyState('Remote datastore', 'This area will be wired to shared remote data in a later milestone.'),
    window.App.createEmptyState('Preferences', 'Accessible controls and validation will be added as the feature is rebuilt.')
  );

  return section;
};
