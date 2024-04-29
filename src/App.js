import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, addUser } from "./redux/usersSlice";
import "./App.css"

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
};

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [searchValue, setSearchValue] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const handleGetUsers = async () => {
    const usersData = await fetchUsers();
    dispatch(setUsers(usersData));
  };

  const getLastUserId = () => {
    if (users.length === 0) {
      return 0;
    }
    const lastUser = users[users.length - 1];
    return lastUser.id;
  };

  const handleSearchUser = () => {
    const foundUser = users.find((user) => user.id === parseInt(searchValue));
    if (foundUser) {
      setSearchResult(`User found: ${foundUser.name}`);
    } else {
      setSearchResult("User not found");
    }
  };

  const handleCreateUser = () => {
    const newUserId = getLastUserId() + 1;
    dispatch(addUser({ id: newUserId, name: newUserName }));
    setNewUserName("");
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={handleGetUsers}>Get All Users</button>
      <input
        type="text"
        placeholder="Enter user ID"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearchUser}>Search User</button>
      <br />
      <input
        type="text"
        placeholder="Enter new user name"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <button onClick={handleCreateUser}>Create User</button>
      <h1>{searchResult}</h1>
      <ul>
        {users.map((user) => (
          <li id={user.id} key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
