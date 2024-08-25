import { create } from "zustand";
import { Letter } from "../../types/Letter";
import { immer } from "zustand/middleware/immer";

export type Data = {
  data: Letter[],
  renderData: number[][],
  rawData: string,
  lengthArr: number[],
  setData: (data: Data["data"]) => void,
  setRenderData: (renderData: Data["renderData"]) => void,
  setRawData: (rawData: Data["rawData"]) => void,
  setLengthArr: (lengthArr: Data["lengthArr"]) => void,
  setCorrect: (id: number, isCorrect: Letter["isCorrect"]) => void,
}

const useDataStore = create<Data>()(immer((set) => ({
  data: [],
  renderData: [],
  rawData: "",
  lengthArr: [],
  setData: (data: Data["data"]) => set({ data }),
  setRenderData: (renderData: Data["renderData"]) => set({ renderData }),
  setRawData: (rawData: Data["rawData"]) => set({ rawData }),
  setLengthArr: (lengthArr: Data["lengthArr"]) => set({ lengthArr }),
  setCorrect: (id: number, isCorrect: Letter["isCorrect"]) => set((draft) => {
    const item = draft.data.find((item: Letter) => item.id === id);
    if (item) {
      item.isCurrent = false;
      item.isCorrect = isCorrect;
    }
  }),
})))

export default useDataStore;