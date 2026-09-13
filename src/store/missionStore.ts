import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProceduralMission {
  id: string;
  type: 'SCORE' | 'MERGE_TILE' | 'TOTAL_MERGERS' | 'REACH_COMBO';
  targetValue: number;
  currentProgress: number;
  rewardCoins: number;
  completed: boolean;
  claimed: boolean;
  description: string;
}

interface MissionState {
  missionsDate: string | null;
  missions: ProceduralMission[];
  generateMissions: () => void;
  updateProgress: (type: 'SCORE' | 'MERGE_TILE' | 'TOTAL_MERGERS' | 'REACH_COMBO', value: number, tileValue?: number) => void;
  claimMission: (missionId: string, addCoins: (amt: number) => void) => void;
}

function getSeedRandom(seedStr: string) {
  let h = 0;
  for(let i=0; i<seedStr.length; i++) h = Math.imul(31, h) + seedStr.charCodeAt(i) | 0;
  return function() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  }
}

export const useMissionStore = create<MissionState>()(
  persist(
    (set, get) => ({
      missionsDate: null,
      missions: [],

      generateMissions: () => {
        const today = new Date().toDateString();
        // Return if we already generated for today
        if (get().missionsDate === today && get().missions.length > 0) return;

        const rng = getSeedRandom(today);
        const random = () => rng() / 4294967296;

        const baseMissions: ProceduralMission[] = [
          {
            id: 'm1',
            type: 'TOTAL_MERGERS',
            targetValue: Math.floor(random() * 50) + 50, // 50-100 merges
            currentProgress: 0,
            rewardCoins: 50,
            completed: false,
            claimed: false,
            description: ''
          },
          {
            id: 'm2',
            type: 'MERGE_TILE',
            targetValue: [16, 32, 64][Math.floor(random() * 3)], 
            currentProgress: 0,
            rewardCoins: 100,
            completed: false,
            claimed: false,
            description: ''
          },
          {
            id: 'm3',
            type: 'REACH_COMBO',
            targetValue: Math.floor(random() * 3) + 3, // 3-5 combo
            currentProgress: 0,
            rewardCoins: 150,
            completed: false,
            claimed: false,
            description: ''
          }
        ];

        // Format descriptions
        baseMissions[0].description = `Make ${baseMissions[0].targetValue} total merges`;
        baseMissions[1].description = `Merge to create a ${baseMissions[1].targetValue} tile`;
        baseMissions[2].description = `Reach a ${baseMissions[2].targetValue}x merge combo`;

        set({ missionsDate: today, missions: baseMissions });
      },

      updateProgress: (type, value, tileValue) => {
        set((state) => {
          const newMissions = state.missions.map(m => {
            if (m.completed) return m;

            let add = 0;
            if (m.type === type) {
              if (type === 'TOTAL_MERGERS') add = value;
              if (type === 'SCORE') add = value;
              if (type === 'REACH_COMBO') {
                if (value >= m.targetValue) m.currentProgress = m.targetValue;
              }
              if (type === 'MERGE_TILE') {
                if (tileValue === m.targetValue) add = value;
              }
            }

            if (add > 0) {
              m.currentProgress += add;
            }

            if (m.currentProgress >= m.targetValue) {
              m.currentProgress = m.targetValue;
              m.completed = true;
            }
            return { ...m };
          });
          return { missions: newMissions };
        });
      },

      claimMission: (missionId, addCoins) => {
        set((state) => {
          const mission = state.missions.find(m => m.id === missionId);
          if (mission && mission.completed && !mission.claimed) {
            mission.claimed = true;
            // Add coins callback
            addCoins(mission.rewardCoins);
            return { missions: [...state.missions] };
          }
          return state;
        });
      }
    }),
    {
      name: 'mission-storage'
    }
  )
);
