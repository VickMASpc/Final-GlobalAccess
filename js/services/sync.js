import { dispatch, getState } from '../core/state.js';
import { createMonthBudget, SYNC_STATUS } from '../core/schema.js';
import { hasFirebaseConfig, listenToMonth, listenToWorkspace, writeMonth, writeWorkspace } from './firebase.js';

const WRITE_DEBOUNCE_MS = 800;
let workspaceUnsubscribe = null;
let monthUnsubscribe = null;
let saveTimer = null;
let activeWorkspaceId = null;
let activeMonthId = null;
let applyingRemoteSnapshot = false;

function setSyncStatus(status, message) {
  dispatch({ type: 'sync/setStatus', status, message });
}

export function connectToWorkspace(workspaceId) {
  disconnectSync();
  activeWorkspaceId = workspaceId;

  if (!hasFirebaseConfig()) {
    setSyncStatus(SYNC_STATUS.OFFLINE, 'Offline - Firebase config missing, using sample data');
    return;
  }

  setSyncStatus(SYNC_STATUS.CONNECTING, 'Connecting to global workspace…');
  workspaceUnsubscribe = listenToWorkspace(
    workspaceId,
    (metadata) => {
      if (metadata) dispatch({ type: 'workspace/set', workspace: { ...getState().workspace, ...metadata, id: workspaceId } });
      setSyncStatus(SYNC_STATUS.SYNCED, 'Global sync active');
    },
    (error) => setSyncStatus(SYNC_STATUS.SAVE_FAILED, `Workspace sync failed: ${error.message}`)
  );

  subscribeToMonth(workspaceId, getState().app.currentMonth);
}

export function subscribeToMonth(workspaceId, monthId) {
  if (monthUnsubscribe) monthUnsubscribe();
  activeWorkspaceId = workspaceId;
  activeMonthId = monthId;

  if (!hasFirebaseConfig()) return;

  setSyncStatus(SYNC_STATUS.CONNECTING, `Connecting to ${monthId}…`);
  monthUnsubscribe = listenToMonth(
    workspaceId,
    monthId,
    (monthData) => {
      if (!monthData) {
        setSyncStatus(SYNC_STATUS.SYNCED, 'Global sync active - new month');
        return;
      }
      applyingRemoteSnapshot = true;
      dispatch({ type: 'month/replace', monthId, monthData: createMonthBudget({ ...monthData, id: monthId }) });
      applyingRemoteSnapshot = false;
      setSyncStatus(SYNC_STATUS.SYNCED, 'Global sync active');
    },
    (error) => setSyncStatus(SYNC_STATUS.SAVE_FAILED, `Month sync failed: ${error.message}`)
  );
}

export function saveMonth(workspaceId, monthId, monthData) {
  if (!hasFirebaseConfig()) return Promise.resolve();
  setSyncStatus(SYNC_STATUS.SAVING, 'Saving to Firestore…');
  return writeMonth(workspaceId, monthId, monthData)
    .then(() => setSyncStatus(SYNC_STATUS.SYNCED, 'Synced'))
    .catch((error) => setSyncStatus(SYNC_STATUS.SAVE_FAILED, `Save failed: ${error.message}`));
}

export function saveWorkspaceMetadata(workspaceId, metadata) {
  if (!hasFirebaseConfig()) return Promise.resolve();
  return writeWorkspace(workspaceId, metadata).catch((error) => setSyncStatus(SYNC_STATUS.SAVE_FAILED, `Workspace save failed: ${error.message}`));
}

export function scheduleCurrentMonthSave(state = getState()) {
  if (applyingRemoteSnapshot || !hasFirebaseConfig()) return;
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    const monthId = state.app.currentMonth;
    saveMonth(state.workspace.id, monthId, state.months[monthId]);
  }, WRITE_DEBOUNCE_MS);
}

export function disconnectSync() {
  if (workspaceUnsubscribe) workspaceUnsubscribe();
  if (monthUnsubscribe) monthUnsubscribe();
  workspaceUnsubscribe = null;
  monthUnsubscribe = null;
  activeWorkspaceId = null;
  activeMonthId = null;
  window.clearTimeout(saveTimer);
}

export function getActiveSyncTarget() {
  return { workspaceId: activeWorkspaceId, monthId: activeMonthId };
}
