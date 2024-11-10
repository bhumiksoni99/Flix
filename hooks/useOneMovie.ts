import useSWR from "swr";
import axios from "axios";

const useOneMovie = (id: string) => {
  console.log("as", id);
  const { data, error, isLoading, mutate } = useSWR(
    `/api/movie?movieId=${id}`,
    (url) => axios.get(url).then((res) => res.data)
  );

  return { data, error, isLoading, mutate };
};

export default useOneMovie;
