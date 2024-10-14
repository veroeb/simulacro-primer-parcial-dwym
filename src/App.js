import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import GameDetails from "./components/GameDetails";
import AddGame from "./components/AddGame";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<GameDetails />} />
        <Route path="/add" element={<AddGame />} />
      </Routes>
    </Router>
  );
};

export default App;
