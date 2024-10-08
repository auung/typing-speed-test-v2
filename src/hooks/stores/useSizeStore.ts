import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import splitParagraph from "../../utils/splitParagraph"
import useDataStore from "./useDataStore"
import compareArrays from "../../utils/compareArrays"

type Size = {
  width: number,
  setWidth: (width: Size["width"]) => void,
}

const useSizeStore = create<Size>()(immer(() => ({
  width: 0,
  setWidth: (width: Size["width"]) => {
    const lengthArr = splitParagraph(useDataStore.getState().rawData, width, 14.4);
    const currentLengthArr = useDataStore.getState().lengthArr;
    if (!compareArrays(lengthArr, currentLengthArr)) {
      useDataStore.getState().setLengthArr(lengthArr);
    }
  }
})))

export default useSizeStore;