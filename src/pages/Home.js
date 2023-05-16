import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAccount from "./UserAccount";
import HomePage from "../components/HomePage";
import Movies from "../components/Movies";
import TvPage from "../components/Tv";
import Bookmark from "../components/Bookmark";
import { MovieContext } from "../context/MovieContext";
import Details from "../components/Details";
import TvDetails from "../components/TvDetails";

const Home = () => {
  const {
    bookmarkItems,
    setBookmarkItems,
    bookmarkTvItems,
    setBookmarkTvItems,
  } = useContext(MovieContext);

  useEffect(() => {
    try {
      const bookmarkData = JSON.parse(localStorage.getItem("bookmarkitems"));
      if (bookmarkData) {
        setBookmarkItems(bookmarkData);
      }
    } catch (err) {
      console.log(err);
    }
    try {
      const bookmarkTvData = JSON.parse(
        localStorage.getItem("bookmarktvitems")
      );

      if (bookmarkTvData) {
        setBookmarkTvItems(bookmarkTvData);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    // bookmarkItems.map((movieItem) => {
    //   localStorage.setItem("bookmarkitems", JSON.stringify(movieItem));
    // });
    localStorage.setItem("bookmarkitems", JSON.stringify(bookmarkItems));
  }, [bookmarkItems]);
  useEffect(() => {
    // bookmarkTvItems.map((movieItem) => {
    //   localStorage.setItem("bookmarkitems", JSON.stringify(movieItem));
    // });
    localStorage.setItem("bookmarktvitems", JSON.stringify(bookmarkTvItems));
  }, [bookmarkTvItems]);
  return (
    <BrowserRouter>
      <div className="flex ">
        <NavBar />
        <div className="homepage">
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="useraccount" element={<UserAccount />} />
            <Route path="movies" element={<Movies />} />
            <Route path="tvshows" element={<TvPage />} />
            <Route path="bookmark" element={<Bookmark />} />
            <Route path="moviedetails/:id" element={<Details />} />
            <Route path="tvdetails/:id" element={<TvDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Home;
