import React from "react";
import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Homepage</h2>
      <p style={{ padding: "3px" }}>
        To log in type user for username and test123 for the password, when you
        first enter the homepage, in the upper right corner of the screen.
      </p>
      <p style={{ padding: "3px" }}>
        A user can see one's profile in the Profile tab. In the Movies tab, the
        user can create a watchlist from searched movies, which when added,
        shows more information gathered by an api, and a review for the movie
        from another api.
      </p>
      <p style={{ padding: "3px" }}>
        The watchlist can be edited by removing movies or add more movies to the
        watchlist.
      </p>
      <p style={{ padding: "3px" }}>
        The admin, when logged in, can see a list of all users in the database.
        The admin's username is admin and password is test456. The list of users
        is in the tab Users.
      </p>
      <p style={{ padding: "3px" }}>
        Any user and admin can log out again by clicking the logout button in
        the same corner where the login button was.{" "}
      </p>
    </div>
  );
}

export default Home;
