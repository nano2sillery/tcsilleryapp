import { collection, doc, setDoc, deleteDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { CreateAnnouncementInput, UpdateAnnouncementInput, Announcement } from './types';

export async function createAnnouncement(input: CreateAnnouncementInput): Promise<string> {
  if (!input.message?.trim()) {
    throw new Error('Le message est requis');
  }

  try {
    const announcementsRef = collection(db, COLLECTIONS.ANNOUNCEMENTS);
    const newAnnouncementRef = doc(announcementsRef);

    const announcementData = {
      message: input.message.trim(),
      active: input.active ?? true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(newAnnouncementRef, announcementData);
    return newAnnouncementRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de l\'annonce:', error);
    throw new Error('Impossible de créer l\'annonce');
  }
}

export async function getAnnouncement(id: string): Promise<Announcement | null> {
  try {
    const docRef = doc(db, COLLECTIONS.ANNOUNCEMENTS, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate(),
      updatedAt: docSnap.data().updatedAt?.toDate()
    } as Announcement;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'annonce:', error);
    throw error;
  }
}

export async function updateAnnouncement(id: string, input: UpdateAnnouncementInput): Promise<void> {
  if (id === '_init' || id === 'default') {
    throw new Error('Cette annonce ne peut pas être modifiée');
  }

  try {
    const announcementRef = doc(db, COLLECTIONS.ANNOUNCEMENTS, id);
    await updateDoc(announcementRef, {
      ...input,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'annonce:', error);
    throw new Error('Impossible de mettre à jour l\'annonce');
  }
}

export async function deleteAnnouncement(id: string): Promise<void> {
  if (id === '_init' || id === 'default') {
    throw new Error('Cette annonce ne peut pas être supprimée');
  }

  try {
    const announcementRef = doc(db, COLLECTIONS.ANNOUNCEMENTS, id);
    await deleteDoc(announcementRef);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'annonce:', error);
    throw new Error('Impossible de supprimer l\'annonce');
  }
}