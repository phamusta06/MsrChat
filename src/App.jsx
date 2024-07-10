/* eslint-disable no-unused-vars */
import "./App.css";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <Routes>
     
      <Route path="/" element={  <Home />  } />
      <Route path="/login" element={ <Login />  }/>
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
