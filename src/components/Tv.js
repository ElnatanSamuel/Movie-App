import axios from "axios";
import React, { useEffect, useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import ReactLoading from "react-loading";
import { UilFilm } from "@iconscout/react-unicons";
import { UilTvRetro } from "@iconscout/react-unicons";
import { UilStar } from "@iconscout/react-unicons";
import { UilBookmark } from "@iconscout/react-unicons";
import { UilAngleDoubleLeft } from "@iconscout/react-unicons";
import { UilAngleDoubleRight } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const TvPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [tvData, setTvData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const handlePageNumberDecrease = () => {
    if (pageNumber >= 1) {
      setPageNumber(pageNumber - 1);
    } else {
      setPageNumber(1);
    }
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=689c28a3e36297672ce25a12ba87c4f2&language=en-US&page=${pageNumber}`
      )
      .then((res) => {
        setTvData(res.data.results);
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setLoading(false);
    }, 4000);

    setPageNumber(1);
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=689c28a3e36297672ce25a12ba87c4f2&language=en-US&page=${pageNumber}`
      )
      .then((res) => {
        setTvData(res.data.results);
      })
      .catch((err) => console.log(err));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [pageNumber]);
  return (
    <div className="pt-4">
      <p className="pt-4 text-white text-2xl font-light">All Tv shows</p>
      {loading ? (
        <ReactLoading
          className="loadingscreen"
          type={"spin"}
          color={"#fc464a"}
          height={"4%"}
          width={"4%"}
        />
      ) : (
        <div>
          <div className="listitems">
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
          <div className="flex justify-center items-center mt-4 mb-4 space-x-2">
            <UilAngleDoubleLeft
              className="cursor-pointer"
              color="#fc464a"
              size="28"
              onClick={(e) => handlePageNumberDecrease(e)}
            />
            <p className="px-3 py-1 bg-teritiary text-sm text-white">
              {pageNumber}
            </p>

            <UilAngleDoubleRight
              className="cursor-pointer"
              color="#fc464a"
              size="28"
              onClick={(e) => setPageNumber(pageNumber + 1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TvPage;
