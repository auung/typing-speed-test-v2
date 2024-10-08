import useDataStore from "../hooks/stores/useDataStore";
import useTypingStatusStore from "../hooks/stores/useTypingStatusStore";
import useTimerStore from "../hooks/stores/useTimerStore";
import calcSpeed from "../utils/calcSpeed";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";
import { useEffect } from "react";

const Proficiency = () => {
  const interval = 2;
  const wpm = useTypingStatusStore((state) => state.wpm);
  const accuracy = useTypingStatusStore((state) => state.accuracy);
  const setWpm = useTypingStatusStore((state) => state.setWpm);
  const setAccuracy = useTypingStatusStore((state) => state.setAccuracy);
  const data = useDataStore((state) => state.data);
  const initialSeconds = useTimerStore((state) => state.initialSeconds);
  const timer = useTimerStore((state) => state.timer);
  const addOnResetFunc = useTimerStore((state) => state.addOnResetFunc);

  useDidUpdateEffect(() => {
    if (timer.totalSeconds % interval === 0) {
      const letterCount = data.filter(letter => letter.status === "correct").length;
      const errorCount = data.filter(letter => letter.status === "incorrect").length;

      if (letterCount && letterCount > 1) {
        const elapsedTime = initialSeconds - timer.totalSeconds;

        if (elapsedTime !== 0) {
          const wpm = Math.round(calcSpeed(letterCount, elapsedTime) - errorCount);
          const accuracy = (letterCount - errorCount) * 100 / letterCount;
          setWpm(Number.isFinite(wpm) && wpm >= 0 ? wpm : 0);
          setAccuracy(Math.floor(accuracy >= 0 ? accuracy : 0));
        }
      }
    }
  }, [timer.totalSeconds]);

  useEffect(() => {
    addOnResetFunc(() => {
      setAccuracy(0);
      setWpm(0);
    })
  }, [addOnResetFunc, setAccuracy, setWpm])

  return (
    <div className="flex gap-8">
      <div className="flex items-end">
        <span className="mr-1">WPM: </span>
        <span className="text-3xl">{ wpm }</span>
      </div>
      <div className="flex items-end">
        <span className="mr-1">ACC: </span>
        <span className="text-3xl">{ accuracy }%</span>
      </div>
    </div>
  );
}
 
export default Proficiency;