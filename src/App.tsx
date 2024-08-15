import Bottom from "./components/Bottom";
import Hero from "./components/Hero";
import Top from "./components/Top";
import useFetch from "./hooks/useFetchQuery";

const App = () => {
  useFetch("https://paragraphs.vercel.app/2fE1xnT58");

  return (
    <div className="container mx-auto w-3/4 font-mono">
      <Top />
      <Hero />
      <Bottom />
    </div>
  )
}

export default App;
