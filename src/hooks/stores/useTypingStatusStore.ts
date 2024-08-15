import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TypingStatus = {
  wpm: number,
  accuracy: number,
  time: number,
  setWpm: (wpm: TypingStatus["wpm"]) => void,
  setAccuracy: (accuracy: TypingStatus["accuracy"]) => void,
  setTime: (time: TypingStatus["time"]) => void,
  incTime: () => void,
  decTime: () => void,
}

const useTypingStatusStore = create<TypingStatus>()(immer((set) => ({
  wpm: 0,
  accuracy: 0,
  time: 0,
  setWpm: (wpm: TypingStatus["wpm"]) => set({ wpm }),
  setAccuracy: (accuracy: TypingStatus["accuracy"]) => set({ accuracy }),
  setTime: (time: TypingStatus["time"]) => set({ time }),
  incTime: () => set((state) => state.time += 1),
  decTime: () => set((state) => state.time -= 1),
})))

export default useTypingStatusStore;