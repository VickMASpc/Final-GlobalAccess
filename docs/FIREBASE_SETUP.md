# Firebase Setup

Firebase logic is intentionally not implemented in this shell milestone. The rebuilt app remains static-host compatible and will connect to Firestore in a later milestone through `js/services/firebase.js` and `js/services/sync.js`.

## Requirements for the persistence milestone

- Use Firestore or another browser-compatible remote datastore for GLOBAL ACCESS.
- Do not use `localStorage` as the primary data source.
- Treat Firebase client config as public configuration.
- Enforce access control with Firebase Authentication and Firestore security rules.
- Keep the app deployable as static files with no backend server or build step.

## Planned integration points

- `js/services/firebase.js`: Firebase app initialization and Firestore references.
- `js/services/sync.js`: load/save orchestration, debounce, status updates, and error handling.
- `js/core/state.js`: client state updates after remote data loads or saves.
