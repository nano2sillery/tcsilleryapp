import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../db';
import { serverTimestamp } from 'firebase/firestore';
import { COLLECTIONS } from '@/lib/constants';

export async function initializeAnnouncements(): Promise<boolean> {
  try {
    const announcementsRef = collection(db, COLLECTIONS.ANNOUNCEMENTS);

    // Create _init document first
    const initDocRef = doc(announcementsRef, '_init');
    await setDoc(initDocRef, {
      initialized: true,
      timestamp: serverTimestamp()
    });

    // Check if any announcements exist
    const q = query(announcementsRef, where('active', '==', true));
    const snapshot = await getDocs(q);

    // Create default announcement if none exists
    if (snapshot.empty) {
      const defaultDocRef = doc(announcementsRef, 'default');
      await setDoc(defaultDocRef, {
        message: "Bienvenue sur l'application du Tennis Club de Sillery ! Vous pouvez maintenant enregistrer vos matches du Challenge Interne et suivre vos statistiques.",
        active: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des annonces:', error);
    throw error;
  }
}