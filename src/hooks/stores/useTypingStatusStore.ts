import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TypingStatus = {
  wpm: number,
  accuracy: number,
  setWpm: (wpm: TypingStatus["wpm"]) => void,
  setAccuracy: (accuracy: TypingStatus["accuracy"]) => void,
}

const useTypingStatusStore = create<TypingStatus>()(immer((set) => ({
  wpm: 0,
  accuracy: 0,
  setWpm: (wpm: TypingStatus["wpm"]) => set({ wpm }),
  setAccuracy: (accuracy: TypingStatus["accuracy"]) => set({ accuracy }),
})))

export default useTypingStatusStore;