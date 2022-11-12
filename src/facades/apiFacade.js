import URL from "../settings";

const handleHttpErrors = async (res) => {
  if (!res.ok) {
    return await Promise.reject({ status: res.status, fullError: res.json() });
  }
  return await res.json();
};

function apiFacade() {
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const setRoles = (roles) => {
    localStorage.setItem("roles", roles);
  };

  const getRoles = () => {
    return localStorage.getItem("roles") ? localStorage.getItem("roles").split(",") : [];
  };

  const setUsername = (username) => {
    return localStorage.setItem("username", username);
  };

  const getUsername = () => {
    return localStorage.getItem("username");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
  };

  const login = async (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });

    return await fetch(URL + "login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
        setRoles(res.roles);
        setUsername(res.username);
      });
  };

  const searchMovie = async (movieTitle, callback) => {
    const options = makeOptions("GET");

    return await fetch(URL + "movies/" + movieTitle, options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const getMovies = async (callback) => {
    const options = makeOptions("GET", true);

    return await fetch(URL + "users/me/movies/", options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const getUsers = async (callback) => {
    const options = makeOptions("GET", true);

    return await fetch(URL+"users/",options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  }

  const addMovieToWatchlist = async (movie, callback) => {
    const options = makeOptions("POST", true, movie);
    return await fetch(URL + "users/me/movies/", options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };

  const removeMovieFromWatchlist = async (movieId, callback) => {
    const options = makeOptions("DELETE", true);
    return await fetch(URL + "users/me/movies/" + movieId, options)
      .then(handleHttpErrors)
      .then((data) => callback(data));
  };
  const fetchData = async () => {
    const options = makeOptions("GET", true); //True add's the token to the headers doing a check if user is logged in and if the addToken parameter is true, which it is here
    const roles = getRoles();

    // try getting for admin
    if (roles.includes("admin")) {
      return await fetch(URL + "users/me", options).then(handleHttpErrors);
    }

    // then try getting for user
    if (roles.includes( "user")) {
      return await fetch(URL + "users/me", options).then(handleHttpErrors);
    }
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
      console.log(getToken());
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getUsername,
    searchMovie,
    getMovies,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
    getRoles,
    getUsers,
  };
}
const facade = apiFacade();
export default facade;