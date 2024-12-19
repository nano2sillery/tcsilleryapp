import { collection, doc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { CreateMatchInput, UpdateMatchInput } from './types';

export async function createMatch(input: CreateMatchInput): Promise<string> {
  try {
    const matchesRef = collection(db, COLLECTIONS.MATCHES);
    const docRef = await addDoc(matchesRef, {
      ...input,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du match:', error);
    throw new Error('Impossible de créer le match');
  }
}

export async function updateMatch(id: string, data: UpdateMatchInput): Promise<void> {
  try {
    const matchRef = doc(db, COLLECTIONS.MATCHES, id);
    await updateDoc(matchRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du match:', error);
    throw new Error('Impossible de mettre à jour le match');
  }
}

export async function deleteMatch(id: string): Promise<void> {
  try {
    const matchRef = doc(db, COLLECTIONS.MATCHES, id);
    await deleteDoc(matchRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du match:', error);
    throw new Error('Impossible de supprimer le match');
  }
}