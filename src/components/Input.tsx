import { useEffect, useRef, useState } from "react";
import useDataStore from "../hooks/stores/useDataStore";
import useSizeStore from "../hooks/stores/useSizeStore";
import getElementWidth from "../utils/getElementWidth";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";
import useTimerStore from "../hooks/stores/useTimerStore";

const Input = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLParagraphElement[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const counterRef = useRef<number>(0);
  const currentLineRef = useRef<number>(0);

  const [txtInput, setTxtInput] = useState("");

  const data = useDataStore((state) => state.data);
  const setData = useDataStore((state) => state.setData);
  const renderData = useDataStore((state) => state.renderData);
  const setStatus = useDataStore((state) => state.setStatus);
  const goBack = useDataStore((state) => state.goBack);
  const setWidth = useSizeStore((state) => state.setWidth);
  const timer = useTimerStore((state) => state.timer);
  const setOnExpire = useTimerStore((state) => state.setOnExpire);
  const addOnResetFunc = useTimerStore((state) => state.addOnResetFunc);

  useEffect(() => {
    inputRef.current?.focus();
    if (containerRef.current) {
      setWidth(getElementWidth(containerRef.current));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useDidUpdateEffect(() => {
    if (data.length > 0) {
      if (txtInput.length >= counterRef.current) {
        const isCorrect = txtInput[counterRef.current] === data[counterRef.current].letter;
        setStatus(data[counterRef.current].id, isCorrect ? "correct" : "incorrect");
        if (txtInput.length !== 0) {
          counterRef.current += 1;
        }
      } else {
        counterRef.current -= 1;
        goBack(counterRef.current);
      }

      for (let i = 0; i < renderData.length; i++) {
        if (renderData[i].includes(data[counterRef.current].id)) {
          if (i !== currentLineRef.current) {
            currentLineRef.current = i;
            scrollContainer(i);
          }
          break;
        }
      }
    }
  }, [txtInput]);

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

  useEffect(() => {
    setOnExpire(() => {
      if (inputRef.current) {
        inputRef.current.disabled = true;
      }
      setStatus(data[counterRef.current].id, "");
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setOnExpire, setStatus]);

  useEffect(() => {
    addOnResetFunc(() => {
      setData([]);
      setTxtInput("");
      counterRef.current = 0;
      if (inputRef.current) {
        inputRef.current.disabled = false;
      }
    });
  }, [addOnResetFunc, setData])

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
        value={txtInput}
        onChange={(e) => {
          setTxtInput(e.target.value);
          if (!timer.isRunning) {
            timer.start();
          }
        }}
      />
    </>
    
  );
}
 
export default Input;