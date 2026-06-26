export function renderSettingsView(state) {
  const section = document.createElement('section');
  section.className = 'view-card';
  section.setAttribute('aria-labelledby', 'settings-title');
  section.innerHTML = `
    <header class="view-card__header"><p class="view-card__eyebrow">Setup</p><h2 id="settings-title">Settings</h2><p>Workspace ID <strong>${state.workspace.id}</strong> is used for Firestore path workspaces/${state.workspace.id}.</p></header>
    <div class="placeholder-grid"><article class="placeholder-panel"><h3>Global sync</h3><p>${state.sync.message}</p></article><article class="placeholder-panel"><h3>Persistence</h3><p>Firestore is the primary persistence layer. localStorage is only for lightweight workspace preferences.</p></article></div>`;
  return section;
}
