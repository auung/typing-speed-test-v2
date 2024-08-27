import { useEffect } from "react";
import useDataStore from "../hooks/stores/useDataStore";
import useTypingStatusStore from "../hooks/stores/useTypingStatusStore";
import useTimerStore from "../hooks/stores/useTimerStore";
import calcSpeed from "../utils/calcSpeed";
import useDidUpdateEffect from "../hooks/useDidUpdateEffect";

type LayoutProps = {
  title: string,
  value: number
}

const Layout = ({ title, value }: LayoutProps) => {
  return (
    <div className="flex items-end">
      <span className="mr-1">{ title }: </span>
      <span className="text-2xl">{ value }</span>
    </div>
  )
}

const Proficiency = () => {
  const interval = 2;
  const wpm = useTypingStatusStore((state) => state.wpm);
  const accuracy = useTypingStatusStore((state) => state.accuracy);
  const setWpm = useTypingStatusStore((state) => state.setWpm);
  const setAccuracy = useTypingStatusStore((state) => state.setAccuracy);
  const data = useDataStore((state) => state.data);
  const timer = useTimerStore((state) => state.timer);

  useDidUpdateEffect(() => {
    if (timer.totalSeconds % interval === 0) {
      const letterCount = data.findIndex(letter => letter.status === "current");
      const errorCount = data.filter(letter => letter.status === "incorrect").length;

      if (letterCount && letterCount > 1) {
        const elapsedTime = timer.initialSeconds - timer.totalSeconds;
        const wpm = calcSpeed(letterCount, elapsedTime) - errorCount;
        const accuracy = (letterCount - errorCount) * 100 / letterCount;
        setWpm(Math.round(wpm));
        setAccuracy(Math.floor(accuracy));
      }
    }

  }, [timer.totalSeconds]);

  return (
    <div className="flex gap-8">
      <Layout title="WPM" value={wpm} />
      <Layout title="ACC" value={accuracy} />
    </div>
  );
}
 
export default Proficiency;