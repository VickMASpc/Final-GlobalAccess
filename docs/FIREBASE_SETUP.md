# Firebase Setup

Firestore is the primary persistence layer for GLOBAL ACCESS. The app remains a static site and uses Firebase browser ESM imports from the official CDN. No backend server or build system is required.

## 1. Create a Firebase project

1. Create a Firebase project in the Firebase console.
2. Add a web app.
3. Enable Cloud Firestore.
4. Copy the public web app config.
5. Copy `js/config.example.js` to `js/config.js` and fill in the public config values.

Firebase web config is public client configuration. Security must be enforced with Firebase Authentication and Firestore Security Rules, not by hiding config values.

## 2. Firestore paths

The app stores data in small documents rather than one giant shared master document:

```text
workspaces/{workspaceId}
workspaces/{workspaceId}/months/{YYYY-MM}
```

This allows two browser windows using the same workspace id to subscribe to the same month document and receive realtime updates through `onSnapshot`.

## 3. Sync states

The UI exposes these global sync states:

- Offline
- Connecting
- Synced
- Saving
- Save failed

When Firebase config is missing, the app remains offline and renders development seed data only.

## 4. localStorage policy

`localStorage` may only store:

- the last opened workspace id
- lightweight UI preferences

Budget records, months, income, bills, expenses, cards, and loans must be stored in Firestore for GLOBAL ACCESS.

## 5. Example Firestore rules for development

These permissive rules are useful only for local testing. Do not use them for production.

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /workspaces/{workspaceId} {
      allow read, write: if true;
      match /months/{monthId} {
        allow read, write: if true;
      }
    }
  }
}
```

## 6. Production rule direction

For production, require Firebase Authentication and authorize access to a workspace membership list. Do not rely on unguessable workspace ids as the only security control.
