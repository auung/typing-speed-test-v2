import { LegacyRef } from "react";
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type Ref = {
  elementRefs: LegacyRef<HTMLParagraphElement>[],
  setElementRefs: (elementRefs: Ref["elementRefs"]) => void,
}

const useRefStore = create<Ref>()(immer((set) => ({
  elementRefs: [],
  setElementRefs: (elementRefs: Ref["elementRefs"]) => {
    set({ elementRefs })
  },
})))

export default useRefStore;