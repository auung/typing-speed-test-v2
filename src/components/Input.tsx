import { useEffect, useRef } from "react";
import useDataStore from "../hooks/stores/useDataStore";
import useSizeStore from "../hooks/stores/useSizeStore";
import getElementWidth from "../utils/getElementWidth";
import useRefStore from "../hooks/stores/useRefStore";

const Input = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderData = useDataStore((state) => state.renderData);
  // const width = useSizeStore((state) => state.width);
  const setWidth = useSizeStore((state) => state.setWidth);

  const elementRefs = useRefStore((state) => state.elementRefs);
  const setElementRefs = useRefStore((state) => state.setElementRefs);
  
  useEffect(() => {
    if (containerRef.current) {
      setWidth(getElementWidth(containerRef.current));
    }
    setElementRefs(renderData.length);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  window.addEventListener("resize", () => {
    if (containerRef.current) {
      setWidth(getElementWidth(containerRef.current));
    }
    // setElementRefs(renderData.length);
  })

  return (
    <div className="h-40 bg-gray-400 overflow-hidden px-6 py-2" ref={containerRef}>
      { renderData.map((line, index) => {
        return (
          <p key={line.id} className="text-2xl leading-loose" ref={elementRefs[index]}>
            { line.array.map(letter => {             
              return (
                <span key={ letter.id }>{ letter.letter }</span>
              )
            }) }
          </p>
        )
      }) }
    </div>
  );
}
 
export default Input;