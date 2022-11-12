import React, { useState, useEffect } from "react";
import facade from "../facades/apiFacade";
import "../styles/header.css";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    facade.getUsers((allUsers) => {
      setUsers(allUsers);
    });
  }, [facade]);

  return (
    <div>
      <h3 style={{ "text-align": "center" }}>List of all users</h3>
      <table
        style={{ marginRight: "auto", marginLeft: "auto", border: "solid 1px" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Age</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.age}</td>
              <td>{user.roles.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
