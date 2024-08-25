import { useEffect, useRef, useState } from "react";
import useDataStore from "../hooks/stores/useDataStore";
import useSizeStore from "../hooks/stores/useSizeStore";
import getElementWidth from "../utils/getElementWidth";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";

const Input = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const counterRef = useRef<number>(0);
  const currentLineRef = useRef<number>(0);

  const [txtInput, setTxtInput] = useState("");

  const data = useDataStore((state) => state.data);
  const renderData = useDataStore((state) => state.renderData);
  const setCorrect = useDataStore((state) => state.setCorrect);
  const setWidth = useSizeStore((state) => state.setWidth);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(getElementWidth(containerRef.current));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDidUpdateEffect(() => {
    const index = counterRef.current;

    if (txtInput.length - 1 === index) {
      if (txtInput[index] === data[index].letter) {
        setCorrect(data[index].id, true);
      }

      for (let i = 0; i < renderData.length; i++) {
        if (renderData[i].includes(data[index].id)) {
          if (i !== currentLineRef.current) {
            currentLineRef.current = i;
            scrollContainer(i);
          }
          break;
        }
      }
      counterRef.current++;
    }
    
  }, [txtInput]);

  window.addEventListener("resize", () => {
    if (containerRef.current) {
      setWidth(getElementWidth(containerRef.current));
    }
  })

  function scrollContainer(index: number):void {
    if (index > 1) {
      const scrollPos = lineRef.current[0].offsetHeight * (index - 1);
      containerRef.current?.scrollTo({
        top: scrollPos,
        behavior: "smooth",
      })
    }
  }

  function handleContainerClick() {
    inputRef.current?.focus();
  }

  function assignRef(index: number, el: HTMLParagraphElement | null): void {
    if (el) {
      lineRef.current[index] = el;
    }
  }

  return (
    <>
      <div className="h-40 bg-gray-400 overflow-hidden px-6 py-2" ref={containerRef} onClick={handleContainerClick}>
        { renderData.map((line, index) => {
          return (
            <p key={index} className="text-2xl leading-loose" ref={el => assignRef(index, el)}>
              { line.map(id => {
                return (
                  <span key={ id } className={data[id].isCorrect ? "bg-green-300" : ""}>{ data[id].letter }</span>
                )
              }) }
            </p>
          )
        }) }
      </div>
      <input
          type="text"
          className="w-0 h-0 opacity-0 absolute top-0 left-0"
          ref={inputRef}
          value={txtInput}
          onChange={(e) => setTxtInput(e.target.value)}
        />
    </>
    
  );
}
 
export default Input;