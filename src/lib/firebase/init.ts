import { enableIndexedDbPersistence } from 'firebase/firestore';
import { db } from './db';
import { COLLECTIONS } from '../constants';
import { initializeCollection } from './collections';

export async function initializeFirestore() {
  try {
    // Initialiser la persistence en premier
    try {
      await enableIndexedDbPersistence(db);
    } catch (err: any) {
      if (err.code !== 'failed-precondition' && err.code !== 'unimplemented') {
        throw err;
      }
    }

    // Initialiser les collections
    const results = await Promise.all(
      Object.values(COLLECTIONS).map(collection => 
        initializeCollection(collection)
      )
    );

    return results.every(Boolean);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de Firestore:', error);
    return false;
  }
}