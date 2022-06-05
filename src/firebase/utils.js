/* eslint-disable import/no-mutable-exports */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

let database;
let auth;
let app = null;

function initFirebase(config) {
  if (!app) {
    app = initializeApp(config);
    database = getFirestore(app);
    auth = getAuth();
  }
}

export { database, auth, initFirebase };
