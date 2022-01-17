import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import uniqid from 'uniqid';
import api from '../api/users';
import './App.css';
import Header from './Header';
import AddUser from './User/AddUser';
import UserList from './User/UserList';
import UserAlbums from './User/UserAlbums';
import AlbumPhotos from './Album/AlbumPhotos';

import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "../context/UserAuthContext";

function App() {

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  {/* Retreive all user from Json server API */}
  const retrieveUsers = async () => {
    const response = await api.get("/users");
    return response.data;
  }

  {/* Add new user */}
  const addUserHandler = async (user) => {
    const request = {
      id: uniqid(),
      ...users,
    }

    {/* Post request to add new user to backend */}
    const response = await api.post("/users", request)
    setUsers([...users, response.data]);
  }

  {/* Delete user */}
  const removeUserHandler = async (id) => {
    {/* Delete request to the api */}
    await api.delete(`/users/${id}`);
    const newUserList = users.filter((user) => {
      return user.id !== id;
    });

    setUsers(newUserList);
  }

  {/* Search user by their username */}
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== '') {
      const newUserList = users.filter((user) => {
        return Object.values(user.username)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newUserList);
    } else {
      setSearchResults(users);
    }
  }

  {/* Get all user Initially from API */}
  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsers(allUsers);
    };

    getAllUsers();
  }, [])

  {/* Proteceted routes for the application
      Only authenticated user can navigate to these routes
      /users - List all users
      /add - Add new user
      /user/:id - Get all albums for the given userid
      /photos/:id - Get all photos for the give albumid
      / - Login page (If user not authenticated)
      /singup - Sign Up page */}
  return (
    <div className="ui container">
      <Header />
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserList
                  users={searchTerm.length < 1 ? users : searchResults}
                  getUserId={removeUserHandler}
                  term={searchTerm}
                  searchKeyword={searchHandler}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddUser addUserHandler={addUserHandler} />
              </ProtectedRoute>}
          />
          <Route
            path="/user/:id"
            element={
              <ProtectedRoute>
                <UserAlbums />
              </ProtectedRoute>}
          />
          <Route
            path="/photos/:id"
            element={
              <ProtectedRoute>
                <AlbumPhotos />
              </ProtectedRoute>}
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
