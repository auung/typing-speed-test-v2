import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Timer = {
  initialSeconds: number,
  timer: {
    totalSeconds: number,
    isRunning: boolean,
    start: VoidFunction,
  },
  onExpire: () => void,
  setInitialSeconds: (initialSeconds: Timer["initialSeconds"]) => void,
  setTimer: (timer: Timer["timer"]) => void,
  setOnExpire: (onExpire: Timer["onExpire"]) => void,
  increaseTimer: () => void,
  decreaseTimer: () => void
}

const useTimerStore = create<Timer>()(immer((set) => ({
  initialSeconds: 60,
  timer: {
    totalSeconds: 0,
    isRunning: false,
    start: () => {},
  },
  onExpire: () => {},
  setInitialSeconds: (initialSeconds: Timer["initialSeconds"]) => set({ initialSeconds }),
  setTimer: (timer: Timer["timer"]) => set({ timer }),
  setOnExpire: (onExpire: Timer["onExpire"]) => set({ onExpire }),
  increaseTimer: () => set((draft) => {
    draft.initialSeconds += 30;
  }),
  decreaseTimer: () => set((draft) => {
    draft.initialSeconds -= 30;
  }),
})))

export default useTimerStore;