import { create } from "zustand";

type Timer = {
  timer: {
    initialSeconds: number,
    totalSeconds: number,
    isRunning: boolean,
    start: () => void,
    restart: (newExpiryTimestamp: Date, autoStart: boolean) => void
  },
  onExpire: () => void,
  setTimer: (timer: Timer["timer"]) => void,
  setOnExpire: (onExpire: Timer["onExpire"]) => void,
}

const useTimerStore = create<Timer>((set) => ({
  timer: {
    initialSeconds: 0,
    totalSeconds: 0,
    isRunning: false,
    start: () => {},
    restart: () => {},
  },
  onExpire: () => {},
  setTimer: (timer: Timer["timer"]) => set({ timer }),
  setOnExpire: (onExpire: Timer["onExpire"]) => set({ onExpire })
}))

export default useTimerStore;