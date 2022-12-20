import React from "react";
import { Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import { HomePage } from "./pages/HomePage";
import { Favorites } from "./pages/FavoritesPage";
import { Navigation } from "./components/Navigations";

function App() {
  return (
    <>
    <Navigation/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
