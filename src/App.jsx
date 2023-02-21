import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Game from "./components/Game/Game";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Game />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
