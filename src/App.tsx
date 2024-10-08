import { useEffect } from "react";
import Bottom from "./components/Bottom";
import Hero from "./components/Hero";
import Top from "./components/Top";
import useDataStore, { Data } from "./hooks/stores/useDataStore";
import useFetchQuery from "./hooks/useFetchQuery";

const App = () => {
  useFetchQuery("https://paragraphs.vercel.app/2fE1xnT58");

  const lengthArr = useDataStore((state) => state.lengthArr);
  const setRenderData = useDataStore((state) => state.setRenderData);

  useEffect(() => {
    const dupe =  [...useDataStore.getState().data].map(v => v.id);
    const newRenderData: Data["renderData"] = [];

    lengthArr.forEach(item => {
      newRenderData.push(dupe.splice(0, item))
    })
    setRenderData(newRenderData);
  }, [lengthArr, setRenderData]);

  return (
    <div className="container mx-auto w-3/4 font-mono">
      <Top />
      <Hero />
      <Bottom />
    </div>
  )
}

export default App;
