"use client";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import InfoModal from "./InfoModal";

interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  rating: string;
  duration: string;
}

export default function MovieList({
  title,
  data,
  isLoading,
  onFavouritesChanged,
  favs = false,
  favourites = { movies: [] },
}: {
  title: string;
  data: { movies: Movie[] };
  isLoading: boolean;
  onFavouritesChanged: () => {};
  favs?: boolean;
  favourites?: { movies: Movie[] };
}) {
  const [movie, setMovie] = useState<Movie | null>(null);
  if (isLoading) {
    return (
      <div className="flex flex-col h-screen text-white items-center justify-center">
        Loading...
      </div>
    );
  }

  if (data.movies.length === 0) {
    return null;
  }

  const addFavourite = async (movieId: string) => {
    try {
      await axios.post("/api/add-favourite", {
        movieId,
      });
      onFavouritesChanged();
      toast.success("Added to your list!");
    } catch {
      onFavouritesChanged();
      toast.error("Unable to add this movie to favourites", {
        position: "bottom-center",
      });
    }
  };

  const removeFromFavourites = async (movieId: string) => {
    try {
      await axios.delete("/api/add-favourite", {
        data: { movieId },
      });
      toast.success("Removed from your list!");
      onFavouritesChanged();
    } catch {
      toast.error("Unable to add this movie to favourites", {
        position: "bottom-center",
      });
    }
  };

  const isFavourite = (movieId: string) => {
    return !!favourites.movies.map((movie) => movie.id).includes(movieId);
  };

  const renderMovieCard = (movie: Movie, i: number) => {
    return (
      <div
        className={`z-10 flex flex-col pb-10 transform rounded-lg hover:scale-125 transition duration-200 hover:z-20 cursor-pointer relative ${
          i % 2 == 0 ? `origin-bottom-left` : `origin-right`
        } group`}
        key={i}
      >
        <img src={movie.thumbnailUrl} className="object-fill h-[12vw]" />
        <div className="absolute -bottom-20 w-full flex-col bg-zinc-800 p-4 hidden group-hover:flex duration-200 transition">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row">
              <div
                className="bg-white flex items-center justify-center p-2 rounded-full"
                onClick={() => redirect(`/view/${movie.id}`)}
              >
                <FaPlay />
              </div>
              {!favs ? (
                <div
                  className="border-2 border-zinc-600 flex items-center justify-center p-2 rounded-full ml-2"
                  onClick={() => {
                    addFavourite(movie.id);
                  }}
                >
                  {isFavourite(movie.id) ? (
                    <FaCheck className="text-white" />
                  ) : (
                    <FaPlus className="text-white" />
                  )}
                </div>
              ) : (
                <div
                  className="border-2 border-zinc-600 flex items-center justify-center p-2 rounded-full ml-2"
                  onClick={() => {
                    removeFromFavourites(movie.id);
                  }}
                >
                  <RxCross1 className="text-white" />
                </div>
              )}
            </div>
            <div
              className="border-2 border-zinc-600 flex items-center justify-center p-2 rounded-full ml-2"
              onClick={() => setMovie(movie)}
            >
              <IoIosArrowDown className="text-white" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-white text-xs">{movie.title} Imdb</p>
            <p className="text-white text-xs">{movie.rating} Imdb</p>
            <p className="text-white text-xs">{movie.genre}</p>
            <p className="text-white text-xs">{movie.duration}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="-mt-10 px-8 py-4">
        <Toaster />
        <div className="text-3xl text-white font-semibold">{title}</div>
        <div className="flex w-full mt-4 gap-4">
          {data?.movies.map((movie: Movie, i: number) =>
            renderMovieCard(movie, i)
          )}
        </div>
      </div>
      {movie && (
        <InfoModal
          visible={!!movie}
          movie={movie}
          onClose={() => setMovie(null)}
        />
      )}
    </>
  );
}
