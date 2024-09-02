import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type FetchStatus = {
  isLoading: boolean,
  error: string,
  refetch: VoidFunction | null,
  setLoading: (isLoading: FetchStatus["isLoading"]) => void,
  setError: (error: FetchStatus["error"]) => void,
  setRefetch: (refetch: FetchStatus["refetch"]) => void,
}

const useFetchStatusStore = create<FetchStatus>()(immer((set) => ({
  isLoading: false,
  error: "",
  refetch: null,
  setLoading: (isLoading: FetchStatus["isLoading"]) => set({ isLoading }),
  setError: (error: FetchStatus["error"]) => set({ error }),
  setRefetch: (refetch: FetchStatus["refetch"]) => set({ refetch }),
})))

export default useFetchStatusStore;