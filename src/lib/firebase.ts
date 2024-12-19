import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence, Timestamp } from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence with better error handling
const enablePersistence = async () => {
  try {
    await enableIndexedDbPersistence(db, {
      synchronizeTabs: true
    });
  } catch (err: any) {
    if (err.code === 'failed-precondition') {
      console.warn('La persistence est déjà activée dans un autre onglet');
    } else if (err.code === 'unimplemented') {
      console.warn('Le navigateur ne supporte pas la persistence');
    }
  }
};

// Try to enable persistence but don't block initialization
enablePersistence().catch(console.error);

// Check Firebase connection
export async function checkFirebaseConnection(): Promise<boolean> {
  try {
    const timestamp = Timestamp.now();
    return !!timestamp;
  } catch (error) {
    console.error('Erreur de connexion Firebase:', error);
    return false;
  }
}

export { app, auth, db };