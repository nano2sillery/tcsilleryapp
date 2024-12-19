import { collection, query, getDocs, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { Announcement } from './types';

function normalizeAnnouncement(doc: any): Announcement {
  const data = doc.data();
  return {
    id: doc.id,
    message: data.message || '',
    active: data.active || false,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date()
  };
}

export async function getAllAnnouncements(): Promise<Announcement[]> {
  try {
    const announcementsRef = collection(db, COLLECTIONS.ANNOUNCEMENTS);
    const q = query(announcementsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs
      .filter(doc => doc.id !== '_init')
      .map(normalizeAnnouncement);
  } catch (error) {
    console.error('Erreur lors de la récupération des annonces:', error);
    throw error;
  }
}

export async function getActiveAnnouncement(): Promise<Announcement | null> {
  try {
    const announcementsRef = collection(db, COLLECTIONS.ANNOUNCEMENTS);
    // Simplifions la requête pour éviter le besoin d'index composé
    const q = query(
      announcementsRef,
      where('active', '==', true),
      limit(1)
    );

    const snapshot = await getDocs(q);
    const docs = snapshot.docs.filter(doc => doc.id !== '_init');
    
    if (docs.length === 0) return null;
    return normalizeAnnouncement(docs[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'annonce:', error);
    throw error;
  }
}