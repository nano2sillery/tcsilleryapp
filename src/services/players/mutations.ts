import { collection, doc, setDoc, updateDoc, deleteDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { COLLECTIONS } from '@/lib/constants';
import type { CreatePlayerInput, UpdatePlayerInput } from './types';

export async function createPlayer(input: Omit<CreatePlayerInput, 'id'>): Promise<string> {
  try {
    // Create a new document reference with auto-generated ID
    const playerRef = doc(collection(db, COLLECTIONS.PLAYERS));
    
    // Add the document with the generated ID
    await setDoc(playerRef, {
      ...input,
      id: playerRef.id, // Include the ID in the document
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return playerRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du joueur:', error);
    throw new Error('Impossible de créer le joueur');
  }
}

export async function updatePlayer(id: string, data: UpdatePlayerInput): Promise<void> {
  try {
    const playerRef = doc(db, COLLECTIONS.PLAYERS, id);
    await updateDoc(playerRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du joueur:', error);
    throw new Error('Impossible de mettre à jour le joueur');
  }
}

export async function deletePlayer(id: string): Promise<void> {
  if (!id) {
    throw new Error('ID du joueur requis');
  }

  try {
    // Check if player has any matches
    const matchesRef = collection(db, COLLECTIONS.MATCHES);
    const q1 = query(matchesRef, where('player1Id', '==', id));
    const q2 = query(matchesRef, where('player2Id', '==', id));
    
    const [matches1, matches2] = await Promise.all([
      getDocs(q1),
      getDocs(q2)
    ]);

    if (!matches1.empty || !matches2.empty) {
      throw new Error('Ce joueur ne peut pas être supprimé car il a des matches enregistrés');
    }

    // Delete player document
    const playerRef = doc(db, COLLECTIONS.PLAYERS, id);
    await deleteDoc(playerRef);
  } catch (error) {
    console.error('Erreur lors de la suppression du joueur:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Impossible de supprimer le joueur');
  }
}