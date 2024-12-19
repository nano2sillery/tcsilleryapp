import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../db';
import { serverTimestamp } from 'firebase/firestore';

export async function checkCollectionExists(collectionName: string): Promise<boolean> {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return !snapshot.empty;
  } catch (error) {
    console.error(`Erreur lors de la vérification de ${collectionName}:`, error);
    return false;
  }
}

export async function initializeCollection(collectionName: string): Promise<boolean> {
  try {
    const collectionRef = collection(db, collectionName);
    await setDoc(doc(collectionRef, '_init'), {
      initialized: true,
      timestamp: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error(`Erreur lors de l'initialisation de ${collectionName}:`, error);
    return false;
  }
}