const URL = "http://localhost:8080";

const handleHttpErrors = async (res) => {
  if (!res.ok) {
    return await Promise.reject({ status: res.status, fullError: res.json() });
  }
  return await res.json();
}

function apiFacade() {

  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const setRole = (roles) => {
    localStorage.setItem("roles", roles)
  }

  const getRole = () => {
    return localStorage.getItem("roles")
  }

  const setUsername = (username) => {
    return localStorage.setItem("username", username)
  }

  const getUsername = () => {
    return localStorage.getItem("username")
  }

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
      name: user,
      password: password,
    });

    return await fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token)
        setRole(res.roles)
        setUsername(res.username)
      })
  };

  const fetchData = async () => {
    const options = makeOptions("GET",true); //True add's the token to the headers doing a check if user is logged in and if the addToken parameter is true, which it is here
    const role = getRole()

    // try getting for user
    if(role === "user") {
    return await fetch(URL + "/api/users/me", options)
      .then(handleHttpErrors)
    }

    // then try getting for admin
    if(role === "admin") {
      return await fetch(URL + "/api/info/admin", options)
        .then(handleHttpErrors)
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
  };
}
const facade = apiFacade();
export default facade;
