import { useQuery } from "@tanstack/react-query";
import useFetchStatusStore from "./stores/useFetchStatusStore";
import parseData from "../utils/parseData";
import { useEffect } from "react";
import useDataStore from "./stores/useDataStore";

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Fetch error");
  }
  return response.json();
}

const useFetch = (url: string) => {
  const setData = useDataStore((state) => state.setData);
  const setLoading = useFetchStatusStore((state) => state.setLoading);
  const setError = useFetchStatusStore((state) => state.setError);

  const { isLoading, isError, data, error, isSuccess } = useQuery({
    queryKey: ["paragraph"],
    queryFn: () => fetchData(url),
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  
    if (isError) {
      setError(error.message);
    }
  
    if (isSuccess) {
      setData(parseData(data[0].content));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, data, isLoading, isError, isSuccess]);
}

export default useFetch;