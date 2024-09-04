import useDataStore from "../hooks/stores/useDataStore";
import useFetchStatusStore from "../hooks/stores/useFetchStatusStore";
import Input from "./Input";

const Hero = () => {
  const data = useDataStore((state) => state.data);
  const isLoading = useFetchStatusStore((state) => state.isLoading);

  return (
    <div className="relative">
      { isLoading && <p>Loading...</p> }
      { data && data.length > 0 && <Input />}
    </div>
  );
}

export default Hero;