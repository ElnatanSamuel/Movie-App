import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { MovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";
const LoginReg = () => {
  const { setISLoggedIn, setUserAccount } = useContext(MovieContext);
  const [email, setEmail] = useState("");
  const [loginPage, setLoginPage] = useState(true);
  const [registerPage, setRegisterPage] = useState(false);
  const [password, setPassword] = useState("");
  const [signupErr, setSignupErr] = useState(false);
  const [signinErr, setSigninErr] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCrederntial) => {
        setISLoggedIn(true);
        setUserAccount(userCrederntial.user.email);
        setSignupErr(false);
        // setUserSignedUp(false);
        // setRegister(false);
      })
      .catch((err) => {
        console.log(err);
        setISLoggedIn(false);
        setUserAccount("");
        setSignupErr(true);
        // setUserSignedUp(true);
        // setRegister(true);
      });
  };

  const handleSignin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCrederntial) => {
        setISLoggedIn(true);
        setUserAccount(userCrederntial.user.email);

        setSigninErr(false);
        // setUserSignedUp(false);
        // setRegister(false);
      })
      .catch((err) => {
        console.log(err);
        setISLoggedIn(false);
        setUserAccount("");
        setSigninErr(true);
        // setUserSignedUp(true);
        // setRegister(true);
      });
  };

  const handleRegisterPage = () => {
    setRegisterPage(false);
    setLoginPage(true);
  };

  const handleLoginPage = () => {
    setRegisterPage(true);
    setLoginPage(false);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {registerPage ? (
        <div className="logincont bg-secondary flex flex-col items-center">
          <p className="text-3xl text-white font-bold text-center pt-6">
            Register
          </p>
          {signupErr ? (
            <p className="p-4 bg-red-600 text-white text-sm font-bold">
              Couldn't register, Please try again
            </p>
          ) : null}
          <div className="flex flex-col items-center space-y-4 pt-14">
            <label className="text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              className="inputlogin p-2"
              value={email}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              className="inputlogin p-2"
              value={password}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="pt-4 pb-4 text-gray-300 text-xs">
              Already have an account? Login{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={handleRegisterPage}
              >
                here
              </span>
            </p>
            {/* <Link to="/home"> */}
            <button
              className="signinbtn px-6 py-3 text-sm font-bold"
              onClick={(e) => handleSignup(e)}
            >
              Sign up
            </button>
            {/* </Link> */}
          </div>
        </div>
      ) : null}

      {loginPage ? (
        <div className="logincont bg-secondary flex flex-col items-center">
          <p className="text-3xl text-white font-bold text-center pt-6">
            Login
          </p>
          {signinErr ? (
            <p className="p-4 mt-4 -mb-4 bg-red-600 text-white text-sm font-bold">
              Email or Password incorrect
            </p>
          ) : null}
          <div className="flex flex-col items-center space-y-4 pt-14">
            <label className="text-gray-300" htmlFor="email">
              Email
            </label>
            <input
              className="inputlogin p-2"
              value={email}
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-gray-300" htmlFor="password">
              Password
            </label>
            <input
              className="inputlogin p-2"
              value={password}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="pt-4 pb-4 text-gray-300 text-xs">
              Don't have an account? Sign up{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={handleLoginPage}
              >
                here
              </span>
            </p>
            {/* <Link to="/home"> */}
            <button
              className="signinbtn px-6 py-3 text-sm font-bold"
              onClick={(e) => handleSignin(e)}
            >
              Sign in
            </button>
            {/* </Link> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LoginReg;
