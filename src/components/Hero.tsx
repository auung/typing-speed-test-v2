import useDataStore from "../hooks/stores/useDataStore";
import useFetchStatusStore from "../hooks/stores/useFetchStatusStore";
import Input from "./Input";

const Hero = () => {
  const rawData = useDataStore((state) => state.rawData);
  const isLoading = useFetchStatusStore((state) => state.isLoading);

  return (
    <div className="relative">
      { isLoading && <p>Loading...</p> }
      { rawData && <Input />}
    </div>
  );
}
 
export default Hero;