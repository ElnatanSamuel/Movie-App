import { useContext, useState } from "react";
import NavBar from "../components/NavBar";
import { MovieContext } from "../context/MovieContext";
import { updatePassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const UserAccount = () => {
  const { userAccount, isLoggedIn, setUserAccount, setISLoggedIn } =
    useContext(MovieContext);

  const [changepwd, setChangepwd] = useState(false);
  const [newpwd, setNewpwd] = useState("");
  const [pwdUpdated, setPwdUpdated] = useState(false);
  const [pwdNotUpdated, setPwdNotUpdated] = useState(false);

  const handleLogOut = () => {
    setUserAccount("");
    setISLoggedIn(false);
  };

  const handlePwdChange = () => {
    updatePassword(auth.currentUser, newpwd)
      .then((res) => {
        setPwdUpdated(true);
        if (newpwd === "") {
          setPwdNotUpdated(true);
        } else {
          setChangepwd(false);
          setPwdNotUpdated(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setPwdUpdated(false);
        setPwdNotUpdated(true);
      });
  };
  return (
    <div className="flex pt-8 pl-8">
      <div className="flex flex-col">
        <p className="text-white text-xl font-bold">User Account</p>
        <p className="pt-6 pb-6 text-gray-300 text-sm">
          Email: {isLoggedIn ? userAccount : null}
        </p>
        {pwdUpdated ? (
          <p className="p-4 my-4 text-white text-sm bg-green-600">
            Password Updated
          </p>
        ) : null}
        {pwdNotUpdated ? (
          <p className="p-4 my-4 text-white text-sm bg-red-600">
            Password update Failed, Try again
          </p>
        ) : null}
        {changepwd ? (
          <div className="flex flex-col">
            <label className="text-gray-300" htmlFor="pwd">
              New Password
            </label>
            <input
              value={newpwd}
              type="text"
              id="pwd"
              onChange={(e) => setNewpwd(e.target.value)}
              className="inputlogin p-2 mb-4"
            />
            <button
              className="pwdbtn px-6 py-3 text-sm font-bold"
              onClick={handlePwdChange}
            >
              Submit
            </button>
          </div>
        ) : (
          <button
            className="pwdbtn px-6 py-3 text-sm font-bold"
            onClick={(e) => setChangepwd(true)}
          >
            Change Password
          </button>
        )}
        <Link to="/">
          <button
            className="logoutbtn px-6 py-3 text-sm font-bold"
            onClick={handleLogOut}
          >
            Log out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserAccount;
