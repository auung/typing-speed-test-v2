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
  setStatus: (id: number, isCorrect: boolean) => void,
  goBack: (id: number) => void,
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
  setStatus: (id: number, isCorrect: boolean) => set((draft) => {
    const item = draft.data.find((item: Letter) => item.id === id);
    if (item) {
      item.status = isCorrect ? "correct" : "incorrect";
      const nextItem = draft.data.find((item: Letter) => item.id === id + 1);
      if (nextItem) {
        nextItem.status = "current";
      }
    }
  }),
  goBack: (id: number) => set((draft) => {
    const item = draft.data.find((item: Letter) => item.id === id);
    if (item) {
      item.status = "current";
      const nextItem = draft.data.find((item: Letter) => item.id === id + 1);
      if (nextItem) {
        nextItem.status = "";
      }
    }
  }),
})))

export default useDataStore;