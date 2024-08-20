import { createRef, LegacyRef } from "react";
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type Ref = {
  elementRefs: LegacyRef<HTMLParagraphElement>[],
  setElementRefs: (length: number) => void,
}

const useRefStore = create<Ref>()(immer((set) => ({
  elementRefs: [],
  setElementRefs: (length: number) => {
    set((state) => {
      [...Array(length).keys()]
        .map((_, i) => state.elementRefs[i] || createRef())
    })
  },
})))

export default useRefStore;