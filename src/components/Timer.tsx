import { useTimer } from "react-timer-hook";
import formatTime from "../utils/formatTime";
import useTimerStore from "../hooks/stores/useTimerStore";
import { useEffect } from "react";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";
import useFetchStatusStore from "../hooks/stores/useFetchStatusStore";
import useTypingStatusStore from "../hooks/stores/useTypingStatusStore";
import useDataStore from "../hooks/stores/useDataStore";

const Timer = () => {
  const initialSeconds = useTimerStore((state) => state.initialSeconds);
  const setTimer = useTimerStore((state) => state.setTimer);
  const increaseTimer = useTimerStore((state) => state.increaseTimer);
  const decreaseTimer = useTimerStore((state) => state.decreaseTimer);
  const onExpire = useTimerStore((state) => state.onExpire);
  const refetch = useFetchStatusStore((state) => state.refetch);
  const setWpm = useTypingStatusStore((state) => state.setWpm);
  const setAccuracy = useTypingStatusStore((state) => state.setAccuracy);
  const setInputData = useDataStore((state) => state.setInputData);
  const setCurrentLetter = useDataStore((state) => state.setCurrentLetter);
  const setData = useDataStore((state) => state.setData);

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + initialSeconds);

  const timer = useTimer({ expiryTimestamp, autoStart: false, onExpire });

  useEffect(() => {
    setTimer(timer);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.totalSeconds, timer.isRunning, timer.start])

  useDidUpdateEffect(() => {
    const newExpiryTimestamp = new Date();
    newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + initialSeconds);
    timer.restart(newExpiryTimestamp, false);
  }, [initialSeconds])

  function handleDecreaseTimer() {
    if (initialSeconds > 30) {
      decreaseTimer();
    }
  }

  function handleIncreaseTimer() {
    if (initialSeconds < 300) {
      increaseTimer();
    }
  }

  function handleReset() {
    if (refetch) {
      refetch();
      const newExpiryTimestamp = new Date();
      newExpiryTimestamp.setSeconds(newExpiryTimestamp.getSeconds() + initialSeconds);
      timer.restart(newExpiryTimestamp, false);
      setData([]);
      setWpm(0);
      setAccuracy(0);
      setInputData("");
      setCurrentLetter(0);
    }
  }

  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center justify-center gap-2 w-[172px]">
        { !timer.isRunning && <button className="material-symbols-outlined" onClick={handleDecreaseTimer}>remove</button> }
        <span className="text-4xl">{ formatTime(timer.totalSeconds) }</span>
        { !timer.isRunning && <button className="material-symbols-outlined" onClick={handleIncreaseTimer}>add</button> }
      </div>
      <button className="material-symbols-outlined text-4xl" onClick={handleReset}>refresh</button>
    </div>
    
  );
}
 
export default Timer;