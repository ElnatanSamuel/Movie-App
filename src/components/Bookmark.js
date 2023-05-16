import React, { useContext } from "react";
import { UilBookmark } from "@iconscout/react-unicons";
import ReactLoading from "react-loading";
import { UilFilm } from "@iconscout/react-unicons";
import { UilTvRetro } from "@iconscout/react-unicons";
import { UilStar } from "@iconscout/react-unicons";
import { MovieContext } from "../context/MovieContext";
import { UisBookmark } from "@iconscout/react-unicons-solid";
import { Link } from "react-router-dom";

const Bookmark = () => {
  const {
    bookmarkItems,
    setBookmarkItems,
    bookmarkTvItems,
    setBookmarkTvItems,
  } = useContext(MovieContext);
  const handleMovieDelete = (item) => {
    const index = bookmarkItems.indexOf(item);
    const newCartItem = bookmarkItems
      .slice(0, index)
      .concat(bookmarkItems.slice(index + 1));
    setBookmarkItems(newCartItem);
  };

  const handleTvDeleted = (item) => {
    const index = bookmarkTvItems.indexOf(item);
    const newCartItem = bookmarkTvItems
      .slice(0, index)
      .concat(bookmarkTvItems.slice(index + 1));
    setBookmarkTvItems(newCartItem);
  };
  return (
    <div className="pt-6">
      {bookmarkItems.length !== 0 ? (
        <p className="pt-4 text-white text-2xl font-light">Bookmarked Movies</p>
      ) : null}
      <div className="listitems">
        {bookmarkItems.map((topItem) => {
          const date = topItem.release_date.split("-");
          const year = date[0];
          return (
            <div className="relative rounded-2xl mt-6 mr-4" key={topItem.id}>
              <Link to={`/details/` + topItem.id}>
                <img
                  className="cursor-pointer"
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    topItem.backdrop_path
                  }
                  alt=""
                />
              </Link>
              <UisBookmark
                size="26"
                color="#fff"
                fill="#fff"
                className="bookmark p-1 absolute top-2 right-2 cursor-pointer"
                onClick={(e) => handleMovieDelete(topItem)}
              />
              <div className="mt-2 flex space-x-2">
                <p className="text-gray-500 text-xs">{year}</p>
                <div className="flex space-x-1">
                  <UilFilm className="cursor-pointer" color="#fff" size="14" />
                  <p className="text-gray-500 text-xs">Movie</p>
                </div>
                <div className="flex space-x-1">
                  <UilStar className="cursor-pointer" color="#fff" size="14" />
                  <p className="text-gray-500 text-xs">
                    {topItem.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
              <Link to={`/details/` + topItem.id}>
                <p className="text-white pt-2 text-md cursor-pointer">
                  {topItem.title}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      {bookmarkTvItems.length !== 0 ? (
        <p className="pt-4 text-white text-2xl font-light">
          Bookmarked TV shows
        </p>
      ) : null}
      <div className="listitems">
        {bookmarkTvItems.map((tvItem) => {
          const date = tvItem.first_air_date.split("-");
          const year = date[0];
          return (
            <div className="relative rounded-2xl mt-6 mr-4" key={tvItem.id}>
              <Link to={`/details/` + tvItem.id}>
                <img
                  className="cursor-pointer"
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    tvItem.backdrop_path
                  }
                  alt=""
                />
              </Link>
              <UisBookmark
                size="26"
                color="#fff"
                className="bookmark p-1 absolute top-2 right-2 cursor-pointer"
                onClick={(e) => handleTvDeleted(tvItem)}
              />
              <div className="mt-2 flex space-x-2">
                <p className="text-gray-500 text-xs">{year}</p>
                <div className="flex space-x-1">
                  <UilTvRetro
                    className="cursor-pointer"
                    color="#fff"
                    size="14"
                  />
                  <p className="text-gray-500 text-xs">Tv series</p>
                </div>
                <div className="flex space-x-1">
                  <UilStar className="cursor-pointer" color="#fff" size="14" />
                  <p className="text-gray-500 text-xs">
                    {tvItem.vote_average.toFixed(1)}
                  </p>
                </div>
              </div>
              <Link to={`/details/` + tvItem.id}>
                <p className="text-white pt-2 text-md cursor-pointer">
                  {tvItem.original_name}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmark;
