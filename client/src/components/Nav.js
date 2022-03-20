import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./../logo.png";
export const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <img src={logo} alt="logo" className="logo" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          {/* <li>
            <Link to="/update">Update Products</Link>
          </li> */}
          <li>
            <Link onClick={logout} to="/login">
              Log Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-ul-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
