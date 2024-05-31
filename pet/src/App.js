import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Pets from "./components/Pets";
import LogIn from "./components/LogIn";
import AdoptDog from "./components/Adopt/AdoptDog";
import Adopt from "./components/Adopt/Adopt";
import AdoptCat from "./components/Adopt/AdoptCat";
import AdoptBird from "./components/Adopt/AdoptBird";
import AdoptOther from "./components/Adopt/AdoptOther";
import { Provider } from 'react-redux';
import store from './store'; 
import AddCat from "./components/AddPet/AddCat";
import AddBird from "./components/AddPet/AddBird";
import AddOther from "./components/AddPet/AddOther";
import AddDog from "./components/AddPet/AddDog";




function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/addPet" element={<Pets />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/adoptDog" element={<AdoptDog />} />
          <Route path="/adoptOther" element={<AdoptOther />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/adoptCat" element={<AdoptCat />} />
          <Route path="/adoptBird" element={<AdoptBird />} />
          <Route path="/addDog" element={<AddDog />} />
          <Route path="/addCat" element={<AddCat />} />
          <Route path="/addBird" element={<AddBird />} />
          <Route path="/addOther" element={<AddOther />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;