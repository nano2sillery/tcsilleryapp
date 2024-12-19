import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import { serverTimestamp } from 'firebase/firestore';

export async function initializeAnnouncements() {
  try {
    const announcementsRef = collection(db, COLLECTIONS.ANNOUNCEMENTS);

    // Create _init document first
    const initDocRef = doc(announcementsRef, '_init');
    await setDoc(initDocRef, {
      initialized: true,
      timestamp: serverTimestamp()
    });

    // Check if default announcement exists
    const defaultQuery = query(
      announcementsRef,
      where('active', '==', true)
    );
    const snapshot = await getDocs(defaultQuery);

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
    return false;
  }
}