import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './db';

export async function initializeCollection(collectionName: string) {
  try {
    const initDocRef = doc(collection(db, collectionName), '_init');
    
    // Vérifier si déjà initialisé
    const initDoc = await getDoc(initDocRef);
    if (initDoc.exists()) {
      return true;
    }

    // Initialiser la collection
    await setDoc(initDocRef, {
      initialized: true,
      timestamp: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error(`Erreur lors de l'initialisation de ${collectionName}:`, error);
    return false;
  }
}