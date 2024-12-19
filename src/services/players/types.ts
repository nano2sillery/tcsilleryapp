import type { Player } from '@/types';

export type { Player };

export interface CreatePlayerInput extends Omit<Player, 'id'> {
  id: string;
}

export interface UpdatePlayerInput extends Partial<Player> {
  updatedAt?: Date;
}