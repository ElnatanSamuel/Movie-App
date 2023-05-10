import "./App.css";
import NavBar from "./components/NavBar";
import { MovieContext } from "./context/MovieContext";
import Home from "./pages/Home";
import LoginReg from "./pages/LoginReg";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setISLoggedIn] = useState(false);
  const [userAccount, setUserAccount] = useState("");
  const [userAccountView, setUserAccountView] = useState(false);
  const [bookmarkItems, setBookmarkItems] = useState([]);
  const [bookmarkTvItems, setBookmarkTvItems] = useState([]);

  useEffect(() => {
    const loggedInData = JSON.parse(localStorage.getItem("logged in"));

    if (loggedInData) {
      setISLoggedIn(loggedInData);
    }

    const userData = localStorage.getItem("username");

    if (userData) {
      setUserAccount(userData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("logged in", JSON.stringify(isLoggedIn));
    localStorage.setItem("username", userAccount);
  }, [isLoggedIn, userAccount]);

  return (
    <MovieContext.Provider
      value={{
        isLoggedIn,
        setISLoggedIn,
        userAccount,
        setUserAccount,
        setUserAccountView,
        userAccountView,
        bookmarkItems,
        setBookmarkItems,
        bookmarkTvItems,
        setBookmarkTvItems,
      }}
    >
      <div className="App max-w-7xl">
        {isLoggedIn ? <Home /> : <LoginReg />}
      </div>
    </MovieContext.Provider>
  );
}

export default App;
