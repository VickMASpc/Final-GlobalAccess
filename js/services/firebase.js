import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import { FIREBASE_CONFIG } from '../config.js';

let firebaseApp = null;
let firestoreDb = null;

export function hasFirebaseConfig() {
  return Boolean(FIREBASE_CONFIG?.apiKey && FIREBASE_CONFIG?.projectId && FIREBASE_CONFIG?.appId);
}

export function initializeFirebase() {
  if (!hasFirebaseConfig()) return null;
  if (!firebaseApp) {
    firebaseApp = initializeApp(FIREBASE_CONFIG);
    firestoreDb = getFirestore(firebaseApp);
  }
  return { app: firebaseApp, db: firestoreDb };
}

export function getDb() {
  return initializeFirebase()?.db || null;
}

export function getWorkspaceRef(workspaceId) {
  const db = getDb();
  return db ? doc(db, 'workspaces', workspaceId) : null;
}

export function getMonthRef(workspaceId, monthId) {
  const db = getDb();
  return db ? doc(collection(doc(db, 'workspaces', workspaceId), 'months'), monthId) : null;
}

export function listenToWorkspace(workspaceId, onData, onError) {
  const ref = getWorkspaceRef(workspaceId);
  if (!ref) return null;
  return onSnapshot(ref, (snapshot) => onData(snapshot.exists() ? snapshot.data() : null), onError);
}

export function listenToMonth(workspaceId, monthId, onData, onError) {
  const ref = getMonthRef(workspaceId, monthId);
  if (!ref) return null;
  return onSnapshot(ref, (snapshot) => onData(snapshot.exists() ? snapshot.data() : null), onError);
}

export function writeWorkspace(workspaceId, metadata) {
  const ref = getWorkspaceRef(workspaceId);
  if (!ref) return Promise.reject(new Error('Firebase is not configured.'));
  return setDoc(ref, { ...metadata, updatedAt: serverTimestamp() }, { merge: true });
}

export function writeMonth(workspaceId, monthId, monthData) {
  const ref = getMonthRef(workspaceId, monthId);
  if (!ref) return Promise.reject(new Error('Firebase is not configured.'));
  return setDoc(ref, { ...monthData, id: monthId, metadata: { ...monthData.metadata, updatedAt: new Date().toISOString() } }, { merge: true });
}
