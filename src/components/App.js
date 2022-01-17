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


  const retrieveUsers = async () => {
    const response = await api.get("/users");
    return response.data;
  }

  const addUserHandler = async (user) => {
    const request = {
      id: uniqid(),
      ...users,
    }

    const response = await api.post("/users", request)
    setUsers([...users, response.data]);
  }

  const removeUserHandler = async (id) => {

    await api.delete(`/users/${id}`);
    const newUserList = users.filter((user) => {
      return user.id !== id;
    });

    setUsers(newUserList);
  }

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

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsers(allUsers);
    };

    getAllUsers();
  }, [])


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
