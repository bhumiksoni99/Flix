"use client";
import useFavourites from "@/hooks/useFavourites";
import useMovies from "@/hooks/useMovies";
import React, { useCallback } from "react";
import MovieList from "./MovieList";

export default function AllMovieLists() {
  const { data, isLoading, mutate } = useMovies();
  const {
    data: favs,
    isLoading: favsLoading,
    mutate: mutateFavs,
  } = useFavourites();
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen text-white items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <MovieList
        title="Trending Now"
        data={data}
        favourites={favs}
        isLoading={isLoading}
        onFavouritesChanged={() => mutateFavs()}
      />
      <MovieList
        title="My List"
        data={favs}
        favs={true}
        isLoading={favsLoading}
        onFavouritesChanged={() => mutateFavs()}
      />
    </>
  );
}
