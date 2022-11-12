import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/header.css";
import LoggedInNavBar from "./LoggedInNavBar";
import Login from "./Login";

function Header({ loggedIn, setErrorMsg, setLoggedIn, roles }) {
  return (
    <nav className="topnav">
      <NavLink className="active" to="/">
        <i className="fa fa-fw fa-home"></i> Home
      </NavLink>

      <NavLink to="/movies">
        <i className="fa fa-fw fa-search"></i> Movies
      </NavLink>

      {loggedIn && roles.includes("admin") && (
        <NavLink to="/users">
          <i className="fa fa-fw fa-user" /> Users
        </NavLink>
      )}

      <NavLink to="/contact">
        <i className="fa fa-fw fa-envelope"></i> Contact
      </NavLink>

      {loggedIn && (
        <NavLink to="profile">
          <i className="fa fa-fw fa-id-badge"></i> Profile
        </NavLink>
      )}

      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} setErrorMsg={setErrorMsg} />
      ) : (
        <div>
          <LoggedInNavBar setLoggedIn={setLoggedIn} />
        </div>
      )}
    </nav>
  );
}

export default Header;
