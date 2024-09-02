import { useCallback, useEffect, useRef } from "react";
import useDataStore from "../hooks/stores/useDataStore";
import useSizeStore from "../hooks/stores/useSizeStore";
import getElementWidth from "../utils/getElementWidth";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";
import useTimerStore from "../hooks/stores/useTimerStore";

const Input = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentLineRef = useRef<number>(0);

  const inputData = useDataStore((state) => state.inputData);
  const setInputData = useDataStore((state) => state.setInputData);
  const currentLetter = useDataStore((state) => state.currentLetter);
  const setCurrentLetter = useDataStore((state) => state.setCurrentLetter);
  const data = useDataStore((state) => state.data);
  const renderData = useDataStore((state) => state.renderData);
  const setStatus = useDataStore((state) => state.setStatus);
  const goBack = useDataStore((state) => state.goBack);
  const setWidth = useSizeStore((state) => state.setWidth);
  const timer = useTimerStore((state) => state.timer);
  const setOnExpire = useTimerStore((state) => state.setOnExpire);

  useEffect(() => {
    inputRef.current?.focus();
    if (containerRef.current) {
      setWidth(getElementWidth(containerRef.current));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useDidUpdateEffect(() => {
    if (data.length > 0) {
      if (inputData.length >= currentLetter) {
        const isCorrect = inputData[currentLetter] === data[currentLetter].letter;
        setStatus(data[currentLetter].id, isCorrect ? "correct" : "incorrect");
        if (inputData.length !== 0) {
          setCurrentLetter(currentLetter + 1);
        }
      } else {
        setCurrentLetter(currentLetter - 1);
        goBack(currentLetter - 1);
      }

      for (let i = 0; i < renderData.length; i++) {
        if (renderData[i].includes(data[currentLetter].id)) {
          if (i !== currentLineRef.current) {
            currentLineRef.current = i;
            scrollContainer(i);
          }
          break;
        }
      }
    }
    
  }, [inputData]);

  window.addEventListener("resize", () => {
    if (containerRef.current) {
      setWidth(getElementWidth(containerRef.current));
    }
  })

  function scrollContainer(index: number):void {
    const scrollPos = index > 1 ? lineRef.current[0].offsetHeight * (index - 1) : 0;
    containerRef.current?.scrollTo({
      top: scrollPos,
      behavior: "smooth",
    })
  }

  function handleContainerClick() {
    inputRef.current?.focus();
  }

  function assignRef(index: number, el: HTMLParagraphElement | null): void {
    if (el) {
      lineRef.current[index] = el;
    }
  }

  const handleTimerExpire = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.disabled = true;
    }
    setStatus(data[currentLetter].id, "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setStatus])

  useEffect(() => {
    setOnExpire(handleTimerExpire);
  }, [handleTimerExpire, setOnExpire]);

  useEffect(() => {
    console.count('counter');
  })

  return (
    <>
      <div className="h-40 bg-gray-400 overflow-hidden px-6 py-2 cursor-text" ref={containerRef} onClick={handleContainerClick}>
        { data && renderData && data.length === renderData.reduce((prev, curr) => prev + curr.length, 1) && renderData.map((line, index) => {
          return (
            <p key={index} className="text-2xl leading-loose" ref={el => assignRef(index, el)}>
              { line.map(id => {
                return (
                  <span
                    key={ id }
                    className={
                      data[id].status === "correct" ? "bg-green-300" : 
                      data[id].status === "incorrect" ? "bg-red-400" :
                      data[id].status === "current" ? "animate-cursorBlink" : ""
                    }
                  >{ data[id].letter }</span>
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
          value={inputData}
          onChange={(e) => {
            setInputData(e.target.value);
            if (!timer.isRunning) {
              timer.start();
            }
          }}
        />
    </>
    
  );
}
 
export default Input;