import useSWR from "swr";
import axios from "axios";

const useFavourites = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/get-favourites",
    (url) => axios.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false, // Ensure it's configured as needed
      revalidateOnReconnect: true,
    }
  );

  console.log("sas", data);

  return { data, error, isLoading, mutate };
};

export default useFavourites;
