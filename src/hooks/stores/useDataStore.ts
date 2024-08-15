import { create } from "zustand";
import { Letter } from "../../types/Letter";
import { immer } from "zustand/middleware/immer";

type Data = {
  data: Letter[],
  setData: (data: Data["data"]) => void,
  setCorrect: (id: number, isCorrect: Letter["isCorrect"]) => void,
}

const useDataStore = create<Data>()(immer((set) => ({
  data: [{
    id: 0,
    letter: "",
    isCurrent: false,
    isCorrect: false
  }],
  setData: (data: Data["data"]) => set({ data }),
  setCorrect: (id: number, isCorrect: Letter["isCorrect"]) => set((draft) => {
    const item = draft.data.find((item: Letter) => item.id === id);
    if (item) {
      item.isCurrent = false;
      item.isCorrect = isCorrect;
    }
  }),
})))

export default useDataStore;