import { useEconomyStore } from '../store/economyStore';

export function syncMatchResultSecure(score: number, merges: number, highestTile: number, combo: number, timeSpent: number, mode: string = 'classic') {
  try {
    useEconomyStore.getState().recordMatch(score, merges, highestTile, combo, mode);
  } catch (e) {
    console.error("Match sync failed:", e);
  }
}
