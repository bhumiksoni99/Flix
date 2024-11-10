import useSWR from "swr";
import axios from "axios";

const useMovies = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/get-movies", (url) =>
    axios.get(url).then((res) => res.data)
  );

  return { data, error, isLoading, mutate };
};

export default useMovies;
