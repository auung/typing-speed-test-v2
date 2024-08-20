import { useEffect } from "react";
import Bottom from "./components/Bottom";
import Hero from "./components/Hero";
import Top from "./components/Top";
import useDataStore, { Data } from "./hooks/stores/useDataStore";
import useFetchQuery from "./hooks/useFetchQuery";

const App = () => {
  useFetchQuery("https://paragraphs.vercel.app/2fE1xnT58");

  const splitData = useDataStore((state) => state.splitData);
  // const renderData = useDataStore((state) => state.renderData);
  const setRenderData = useDataStore((state) => state.setRenderData);

  useEffect(() => {
    const dupe =  [...useDataStore.getState().data];
    const parsedSplitArr: Data["renderData"] = [];

    splitData.forEach((item, index) => {
      parsedSplitArr.push({
        id: index,
        array: dupe.splice(0, item.length)
      })
    })
    setRenderData(parsedSplitArr);
  }, [setRenderData, splitData]);

  // useEffect(() => {
  //   console.log(renderData);
    
  // }, [renderData]);

  return (
    <div className="container mx-auto w-3/4 font-mono">
      <Top />
      <Hero />
      <Bottom />
    </div>
  )
}

export default App;
