import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable persistence
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('La persistence est limitée à un seul onglet');
    } else if (err.code === 'unimplemented') {
      console.warn('Le navigateur ne supporte pas la persistence');
    }
  });
} catch (err) {
  console.warn('Erreur lors de l\'activation de la persistence:', err);
}

export { app, auth, db };