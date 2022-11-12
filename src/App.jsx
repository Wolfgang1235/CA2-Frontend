import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Error from "./components/Error";
import Profile from "./components/Profile";
import facade from "./facades/apiFacade";
import AllUsers from "./components/AllUsers";
import Contact from "./components/Contact";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
      <Header
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setErrorMsg={setErrorMsg}
        roles={facade.getRoles()}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="users" element={<AllUsers />} />
        <Route
          path="contact"
          element={
            <Contact
              name="Andreas"
              address={{
                town: "Sometown",
                street: "Somestreet",
                country: "ACountry",
              }}
            />
          }
        />
        <Route
          path="profile"
          element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="error" element={<Error errorMsg={errorMsg} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
