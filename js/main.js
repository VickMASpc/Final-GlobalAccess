import { DEFAULT_WORKSPACE_ID } from './config.js';
import { bindAppEvents } from './core/events.js';
import { dispatch, getState, subscribe } from './core/state.js';
import { connectToWorkspace, subscribeToMonth } from './services/sync.js';
import { renderShell } from './views/shell.js';

function getStoredWorkspaceId() {
  return window.localStorage.getItem('globalaccess:lastWorkspaceId') || DEFAULT_WORKSPACE_ID;
}

function initializeApp() {
  subscribe((state) => {
    renderShell(state);
    window.localStorage.setItem('globalaccess:lastWorkspaceId', state.workspace.id);
  });

  bindAppEvents();
  const workspaceId = getStoredWorkspaceId();
  dispatch({ type: 'workspace/set', workspace: { id: workspaceId, name: workspaceId, ownerLabel: 'Global workspace' } });
  connectToWorkspace(workspaceId);

  let observedTarget = `${workspaceId}:${getState().app.currentMonth}`;
  subscribe((state) => {
    const nextTarget = `${state.workspace.id}:${state.app.currentMonth}`;
    if (nextTarget === observedTarget) return;
    observedTarget = nextTarget;
    subscribeToMonth(state.workspace.id, state.app.currentMonth);
  });
}

document.addEventListener('DOMContentLoaded', initializeApp);
