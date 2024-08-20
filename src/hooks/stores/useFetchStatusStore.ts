import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type FetchStatus = {
  isLoading: boolean;
  error: string;
  setLoading: (isLoading: FetchStatus["isLoading"]) => void;
  setError: (error: FetchStatus["error"]) => void;
}

const useFetchStatusStore = create<FetchStatus>()(immer((set) => ({
  isLoading: false,
  error: "",
  setLoading: (isLoading: FetchStatus["isLoading"]) => set({ isLoading }),
  setError: (error: FetchStatus["error"]) => set({ error }),
})))

export default useFetchStatusStore;