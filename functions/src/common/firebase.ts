import * as admin from 'firebase-admin';

// Load the Firebase service account credentials
// const serviceAccount = require('./../private-key-atom.json');
import * as serviceAccount from './../private-key-atom.json';

// const serviceAccount = JSON.parse(process.env.private_firebase_key!);
// const serviceAccount = JSON.parse(process.env.private_firebase_key!) || functions.config().myapp.private_firebase_key;

// Initialize the Firebase Admin SDK application
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
  });
}
const db = admin.firestore();
export { db };