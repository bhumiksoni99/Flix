import React from "react";
import { FaPlay } from "react-icons/fa";

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

export default function MovieCard({ movie }: { movie: Movie }) {
  const addFavourite = async (movieId: string) => {
    try {
      const res = await axios.post("/api/add-favourite", {
        movieId,
      });
      onFavouritesChanged();
      toast.success("Added to your list!");
    } catch (e) {
      onFavouritesChanged();
      toast.error("Unable to add this movie to favourites", {
        position: "bottom-center",
      });
    }
  };

  const removeFromFavourites = async (movieId: string) => {
    try {
      const res = await axios.delete("/api/add-favourite", {
        data: { movieId },
      });
      toast.success("Removed from your list!");
      onFavouritesChanged();
    } catch (e) {
      toast.error("Unable to add this movie to favourites", {
        position: "bottom-center",
      });
    }
  };

  const isFavourite = (movieId: string) => {
    return !!favourites.movies.map((movie) => movie.id).includes(movieId);
  };
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
          <div className="border-2 border-zinc-600 flex items-center justify-center p-2 rounded-full ml-2">
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
}
