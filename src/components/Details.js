import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UilFilm } from "@iconscout/react-unicons";
import { UilTvRetro } from "@iconscout/react-unicons";
import { UilStar } from "@iconscout/react-unicons";
import { UilBookmark } from "@iconscout/react-unicons";
import { MovieContext } from "../context/MovieContext";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [similarData, setSimilarData] = useState();
  const [similarTvData, setSimilarTvData] = useState();
  const {
    bookmarkItems,
    setBookmarkItems,
    bookmarkTvItems,
    setBookmarkTvItems,
  } = useContext(MovieContext);

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

  useEffect(
    (data) => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=689c28a3e36297672ce25a12ba87c4f2&language=en-US`
        )
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));

      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=689c28a3e36297672ce25a12ba87c4f2&language=en-US&page=1`
        )
        .then((res) => {
          setSimilarData(res.data.results);
        })
        .catch((err) => console.log(err));

      axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}/similar?api_key=689c28a3e36297672ce25a12ba87c4f2&language=en-US&page=1`
        )
        .then((res) => {
          setSimilarTvData(res.data.results);
        })
        .catch((err) => console.log(err));
    },
    [id]
  );

  return (
    <>
      {data ? (
        <>
          <div className="details pt-8 flex flex-col items-center mb-16">
            <img
              className="imgdetail"
              src={"https://image.tmdb.org/t/p/original/" + data.backdrop_path}
              alt=""
            />
            <p className="text-white text-2xl pt-6">
              {data.original_title || data.original_name}
            </p>
            <p className="pt-6 text-center text-white text-md font-thin">
              {data.overview}
            </p>
            <div className="pt-6 flex justify-center items-center">
              <p className="text-gray-400 text-sm pr-4">
                Release Date: {data.release_date}
              </p>
              <p className="text-gray-400 text-sm pr-4">
                Rating: {data.vote_average.toFixed(1)}
              </p>
              <p className="text-gray-400 text-sm">
                Language: {data.original_language.toUpperCase()}
              </p>
            </div>
            <p className="pt-6 pb-6 text-white text-2xl font-light">
              Similar Movies
            </p>
            {similarData ? (
              <div className="listitems">
                {similarData.map((similarItem) => {
                  const date = similarItem.release_date.split("-");
                  const year = date[0];
                  return (
                    <div
                      className="relative rounded-2xl mt-6 mr-4"
                      key={similarItem.id}
                    >
                      <Link to={`/details/` + similarItem.id}>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/original/" +
                            similarItem.backdrop_path
                          }
                          alt=""
                        />
                      </Link>
                      <UilBookmark
                        size="26"
                        color="#fff"
                        className="bookmark p-1 absolute top-2 right-2 cursor-pointer"
                        onClick={(e) => handleBookmarked(similarItem)}
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
                            {similarItem.vote_average.toFixed(1)}
                          </p>
                        </div>
                      </div>
                      <Link to={`/details/` + similarItem.id}>
                        <p className="text-white pt-2 text-md">
                          {similarItem.original_name || similarItem.title}
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : null}
            {similarTvData ? (
              <div className="listitems">
                {similarTvData.map((tvItem) => {
                  const date = tvItem.first_air_date.split("-");
                  const year = date[0];
                  return (
                    <div
                      className="relative rounded-2xl mt-6 mr-4"
                      key={tvItem.id}
                    >
                      <Link to={`/details/` + tvItem.id}>
                        <img
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
                      <div className="mt-2 flex space-x-2 ">
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
                      <Link to={`/details/` + tvItem.id}>
                        <p className="text-white pt-2 text-md">
                          {tvItem.original_name}
                        </p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default Details;
