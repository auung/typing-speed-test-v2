import { useTimer } from "react-timer-hook";
import formatTime from "../utils/formatTime";
import useTimerStore from "../hooks/stores/useTimerStore";
import { useEffect } from "react";

const Timer = () => {
  const initialSeconds = 60;
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + initialSeconds);

  const setTimer = useTimerStore((state) => state.setTimer);
  const onExpire = useTimerStore((state) => state.onExpire);

  const {
    totalSeconds,
    start,
    isRunning,
    restart
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire });

  useEffect(() => {
    setTimer({
      initialSeconds,
      totalSeconds,
      isRunning,
      start,
      restart
    })
  }, [totalSeconds, start, isRunning, restart, setTimer])

  return (
    <span>
      { formatTime(totalSeconds) }
    </span>
  );
}
 
export default Timer;