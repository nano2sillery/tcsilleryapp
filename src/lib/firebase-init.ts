import { collection, doc, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { initializeAnnouncements } from '@/services/announcements/init';

// Vérifier si une collection a des données
async function hasData(collectionName: string): Promise<boolean> {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return !snapshot.empty;
  } catch (error) {
    console.error(`Erreur lors de la vérification de ${collectionName}:`, error);
    return false;
  }
}

// Initialiser toutes les collections nécessaires
export async function initializeDatabase() {
  try {
    // Vérifier et initialiser chaque collection
    for (const collectionName of Object.values(COLLECTIONS)) {
      const hasExistingData = await hasData(collectionName);
      
      if (!hasExistingData) {
        if (collectionName === COLLECTIONS.ANNOUNCEMENTS) {
          await initializeAnnouncements();
        } else {
          const collectionRef = collection(db, collectionName);
          const initDocRef = doc(collectionRef, '_init');
          await setDoc(initDocRef, {
            initialized: true,
            timestamp: new Date()
          });
        }
      }
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    return false;
  }
}