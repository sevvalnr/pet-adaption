import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Pets from "./components/Pets";
import LogIn from "./components/LogIn";
import { Provider } from 'react-redux';
import store from './store'; 



function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;