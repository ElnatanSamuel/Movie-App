import React, { useContext, useEffect, useState } from "react";
import { UilBookmark } from "@iconscout/react-unicons";
import ReactLoading from "react-loading";
import { UilFilm } from "@iconscout/react-unicons";
import { UilTvRetro } from "@iconscout/react-unicons";
import { UilStar } from "@iconscout/react-unicons";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

const Recomended = () => {
  const [topData, setTopData] = useState([]);
  const [tvData, setTvData] = useState([]);
  const {
    bookmarkItems,
    setBookmarkItems,
    bookmarkTvItems,
    setBookmarkTvItems,
  } = useContext(MovieContext);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=689c28a3e36297672ce25a12ba87c4f2&language=en-US&page=1"
      )
      .then((res) => {
        setTopData(res.data.results);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=689c28a3e36297672ce25a12ba87c4f2&language=en-US&page=1"
      )
      .then((res) => {
        setTvData(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBookmarked = (movieItem) => {
    // bookmarkItems.map((item) => {
    //   if (item.id !== movieItem.id) {
    bookmarkItems.push(movieItem);
    // }
    // return;
    // });
  };
  const handleTvBookmarked = (tvItem) => {
    // bookmarkItems.map((item) => {
    //   if (item.id !== movieItem.id) {

    bookmarkTvItems.push(tvItem);
    // }
    // return;
    // });
  };

  return (
    <div>
      <p className="pt-4 text-white text-2xl font-light">Top Rated</p>
      <div className="listitems">
        {topData.map((topItem) => {
          const date = topItem.release_date.split("-");
          const year = date[0];
          return (
            <div className="relative rounded-2xl mt-6 mr-4" key={topItem.id}>
              <Link to={`/moviedetails/` + topItem.id}>
                <img
                  className="cursor-pointer"
                  src={
                    "https://image.tmdb.org/t/p/original/" +
                    topItem.backdrop_path
                  }
                  alt=""
                />
              </Link>
              <UilBookmark
                size="26"
                color="#fff"
                className="bookmark p-1 absolute top-2 right-2 cursor-pointer"
                onClick={(e) => handleBookmarked(topItem)}
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
              <Link Link to={`/moviedetails/` + topItem.id}>
                <p className="text-white pt-2 text-md cursor-pointer">
                  {topItem.title}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="listitems2">
        {tvData.map((tvItem) => {
          const date = tvItem.first_air_date.split("-");
          const year = date[0];
          return (
            <div className="relative rounded-2xl mt-6 mr-4" key={tvItem.id}>
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
                onClick={(e) => handleTvBookmarked(tvItem)}
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
              <Link to={`/tvdetails/` + tvItem.id}>
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

export default Recomended;
