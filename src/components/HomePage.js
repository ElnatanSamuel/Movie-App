import React, { useContext, useEffect, useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Trending from "./Trending";
import axios from "axios";
import { UilBookmark } from "@iconscout/react-unicons";
import ReactLoading from "react-loading";
import { UilFilm } from "@iconscout/react-unicons";
import { UilTvRetro } from "@iconscout/react-unicons";
import { UilStar } from "@iconscout/react-unicons";
import Recomended from "./Recomended";
import Popular from "./Popular";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { bookmarkItems, setBookmarkItems } = useContext(MovieContext);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [movieSearchData, setMovieSearchData] = useState([]);
  const [tvSearchData, setTvSearchData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `
        https://api.themoviedb.org/3/search/movie?api_key=689c28a3e36297672ce25a12ba87c4f2&language=en-US&query=${search}&page=1&include_adult=false`
      )
      .then((res) => {
        setMovieSearchData(res.data.results);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `
        https://api.themoviedb.org/3/search/tv?api_key=689c28a3e36297672ce25a12ba87c4f2&language=en-US&page=1&query=${search}&include_adult=false`
      )
      .then((res) => {
        setTvSearchData(res.data.results);
      })
      .catch((err) => console.log(err));
    setSearchLoading(true);
    setTimeout(() => {
      setSearchLoading(false);
    }, 4000);
  }, [search]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleBookmarked = (movieItem) => {
    bookmarkItems.push(movieItem);
  };

  return (
    <>
      {loading ? (
        // <div className="flex justify-center items-center">
        <ReactLoading
          className="loadingscreen"
          type={"spin"}
          color={"#fc464a"}
          height={"4%"}
          width={"4%"}
        />
      ) : (
        // </div>
        <div className="flex flex-col">
          <div className="relative">
            <UilSearch
              className="absolute top-7 left-4 z-40"
              color="#fff"
              size="20"
            />
            <input
              type="text"
              className="searchinput px-12 py-2 text-sm"
              placeholder="Search for movies or TV series"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {search === "" ? (
            <>
              <Recomended />
              <Popular />
            </>
          ) : (
            <div className="w-screen">
              <p className="pt-4 text-white text-2xl font-light">
                Search results for {search}
              </p>
              {searchLoading ? (
                <ReactLoading
                  className="loadingscreen"
                  type={"spin"}
                  color={"#fc464a"}
                  height={"4%"}
                  width={"4%"}
                />
              ) : (
                <>
                  <div className="md:grid grid-cols-5 sm:grid-cols-3">
                    {movieSearchData.map((movieItem) => {
                      const date = movieItem.release_date.split("-");
                      const year = date[0];
                      return (
                        <div
                          className="relative rounded-2xl mt-6 mr-4"
                          key={movieItem.id}
                        >
                          <Link to={`/moviedetails/` + movieItem.id}>
                            <img
                              className="cursor-pointer"
                              src={
                                "https://image.tmdb.org/t/p/original/" +
                                movieItem.backdrop_path
                              }
                              alt=""
                            />
                          </Link>
                          <UilBookmark
                            size="26"
                            color="#fff"
                            className="bookmark p-1 absolute top-2 right-2 cursor-pointer"
                            onClick={(e) => handleBookmarked(movieItem)}
                          />
                          <div className="mt-2 flex space-x-2">
                            <p className="text-gray-500 text-xs">{year}</p>
                            <div className="flex space-x-1">
                              <UilFilm
                                className="cursor-pointer"
                                color="#fff"
                                size="14"
                              />
                              <p className="text-gray-500 text-xs">Movie</p>
                            </div>
                            <div className="flex space-x-1">
                              <UilStar
                                className="cursor-pointer"
                                color="#fff"
                                size="14"
                              />
                              <p className="text-gray-500 text-xs">
                                {movieItem.vote_average.toFixed(1)}
                              </p>
                            </div>
                          </div>
                          <Link to={`/moviedetails/` + movieItem.id}>
                            <p className="text-white pt-2 text-md cursor-pointer">
                              {movieItem.title}
                            </p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                  <div className="md:grid grid-cols-5 sm:grid-cols-3">
                    {tvSearchData.map((tvItem) => {
                      const date = tvItem.first_air_date.split("-");
                      const year = date[0];
                      return (
                        <div
                          className="relative rounded-2xl mt-6 mr-4"
                          key={tvItem.id}
                        >
                          <Link to={`/tvdetails/` + tvItem.id}>
                            <img
                              className="cursor-pointer"
                              src={
                                "https://image.tmdb.org/t/p/original/" +
                                tvItem.backdrop_path
                              }
                              alt=""
                            />
                          </Link>
                          <UilBookmark
                            size="26"
                            color="#fff"
                            className="bookmark p-1 absolute top-2 right-2 cursor-pointer"
                            onClick={(e) => handleBookmarked(tvItem)}
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
                              <UilStar
                                className="cursor-pointer"
                                color="#fff"
                                size="14"
                              />
                              <p className="text-gray-500 text-xs">
                                {tvItem.vote_average.toFixed(1)}
                              </p>
                            </div>
                          </div>
                          <Link to={`/tvdetails/` + tvItem.id}>
                            <p className="text-white pt-2 text-md cursor-pointer">
                              {tvItem.original_name}
                            </p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
