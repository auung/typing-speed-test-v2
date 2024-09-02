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

const useFetchQuery = (url: string) => {
  const setData = useDataStore((state) => state.setData);
  const setRawData = useDataStore((state) => state.setRawData);
  const setLoading = useFetchStatusStore((state) => state.setLoading);
  const setError = useFetchStatusStore((state) => state.setError);
  const setRefetch = useFetchStatusStore((state) => state.setRefetch);

  const { isLoading, isError, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["paragraph"],
    queryFn: () => fetchData(url),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  
    if (isError) {
      console.log("fetch error");
      setError(error.message);
    }
  
    if (isSuccess) {
      console.log("fetch success");
      const rawData = data[0].content;
      setRawData(rawData);
      setRefetch(refetch);

      const parsedData = parseData(rawData);
      setData(parsedData);
      // console.log(parsedData);
    }

  }, [url, data, isLoading, isError, isSuccess, setLoading, setError, error?.message, setRawData, setRefetch, refetch, setData]);
}

export default useFetchQuery;