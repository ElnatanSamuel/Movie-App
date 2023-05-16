import { useState, useContext } from "react";
import { UilEstate } from "@iconscout/react-unicons";
import { UilFilm } from "@iconscout/react-unicons";
import { UilUserCircle } from "@iconscout/react-unicons";
import { UilClapperBoard } from "@iconscout/react-unicons";
import { UilTvRetro } from "@iconscout/react-unicons";
import { UilBookmark } from "@iconscout/react-unicons";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  // const { userAccountView, setUserAccountView } = useContext(MovieContext);
  const [ishome, setIsHome] = useState("#fff");
  const [isMovies, setIsMovies] = useState("#5d6c92");
  const [isTv, setIsTv] = useState("#5d6c92");
  const [isRecom, setIsRecom] = useState("#5d6c92");

  const handleHomeClick = () => {
    setIsHome("#fff");
    setIsMovies("#5d6c92");
    setIsTv("#5d6c92");
    setIsRecom("#5d6c92");
  };
  const handleMovieClick = () => {
    setIsHome("#5d6c92");
    setIsMovies("#fff");
    setIsTv("#5d6c92");
    setIsRecom("#5d6c92");
  };
  const handleTvClick = () => {
    setIsHome("#5d6c92");
    setIsMovies("#5d6c92");
    setIsTv("#fff");
    setIsRecom("#5d6c92");
  };
  const handleRecomClick = () => {
    setIsHome("#5d6c92");
    setIsMovies("#5d6c92");
    setIsTv("#5d6c92");
    setIsRecom("#fff");
  };
  return (
    <div className="navbar">
      <Link to="/">
        <div className="navmenu">
          <UilClapperBoard color="#fc464a" size="24" />
        </div>
      </Link>
      <div className="navmenuitem">
        <Link to="/">
          <UilEstate
            className="navmenuitems cursor-pointer"
            color={ishome}
            size="19"
            onClick={handleHomeClick}
          />
        </Link>
        <Link to="/movies">
          <UilFilm
            className="navmenuitems cursor-pointer"
            color={isMovies}
            size="19"
            onClick={handleMovieClick}
          />
        </Link>
        <Link to="/tvshows">
          <UilTvRetro
            className="navmenuitems cursor-pointer"
            color={isTv}
            size="19"
            onClick={handleTvClick}
          />
        </Link>
        <Link to="/bookmark">
          <UilBookmark
            className="navmenuitems cursor-pointer"
            color={isRecom}
            size="19"
            onClick={handleRecomClick}
          />
        </Link>
      </div>
      <div>
        <Link to="/useraccount">
          <UilUserCircle className="cursor-pointer" color="#fc464a" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
