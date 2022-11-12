import React from "react";
import facade from "../facades/apiFacade";

const CreateUser = () => {
  //   const user = {
  //     username: document.getElementById("username").value,
  //     password: document.getElementById("password").value,
  //   };

  //   const createUser = (event) => {
  //     event.preventDefault();
  //     facade.createUser(user);
  //   };

  return (
    <div>
      <h3>Create user</h3>
      <input id="username" type="text" placeholder="username"></input>
      <input id="password" type="password" placeholder="password"></input>
      <br />
      <button onClick={createUser}>Create</button>
    </div>
  );
};

export default CreateUser;
