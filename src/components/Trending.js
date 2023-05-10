import React, { useEffect, useState } from "react";
import { UilBookmark } from "@iconscout/react-unicons";
import axios from "axios";

const Trending = () => {
  const [trendData, setTrendData] = useState([]);
  const TrendAPI =
    "https://api.themoviedb.org/3/trending/all/day?api_key=689c28a3e36297672ce25a12ba87c4f2";
  useEffect(() => {
    axios
      .get(TrendAPI)
      .then((res) => {
        setTrendData(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="">
      <p className="pt-6 pl-2 text-2xl text-white fixed top-16">Trending</p>
      <div className="mt-36 flex items-center space-x-4">
        {trendData.map((trend) => {
          return (
            <div className="relative mb-4 w-80" key={trend.id}>
              <div className="shadowdiv"></div>
              <UilBookmark
                size="26"
                color="#fff"
                className="bookmark p-1 absolute top-4 right-4 cursor-pointer"
              />
              <img
                src={
                  "https://image.tmdb.org/t/p/original/" + trend.backdrop_path
                }
                alt=""
                className="trendimg h-48"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
