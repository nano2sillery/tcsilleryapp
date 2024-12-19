export interface MatchData {
  id: string;
  player1Id: string;
  player2Id: string;
  scores: string[];
  winnerId: string;
  date: Date;
}

export interface SetDistribution {
  won: {
    won60: number;
    won61: number;
    won62: number;
    won63: number;
    won64: number;
    won75: number;
    won76: number;
  };
  lost: {
    lost06: number;
    lost16: number;
    lost26: number;
    lost36: number;
    lost46: number;
    lost57: number;
    lost67: number;
  };
}