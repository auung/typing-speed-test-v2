import { useEffect, useRef } from "react";

function useDidUpdateEffect(fn: VoidFunction, inputs: (string|number)[]) {
  const didMountRef = useRef(true);

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false;
    } else {
      fn();
    }
    // eslint-disable-next-line
  }, [...inputs])
}

export default useDidUpdateEffect;