import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Tranding from "./components/Tranding";
import Popular from "./components/Popular";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import People from "./components/People";
import TvCard from "./components/partials/TvDetail";
import MovieDetail from "./components/partials/MovieDetail";
import PeopleDetail from "./components/partials/PeopleDetail";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/tranding") {
      document.title = "Tranding - CineFlix";
    } else if (location.pathname === "/popular") {
      document.title = "Popular - CineFlix";
    } else if (location.pathname === "/movies") {
      document.title = "Movies - CineFlix";
    } else if (location.pathname === "/tv-shows") {
      document.title = "Tv-Shows - CineFlix";
    } else if (location.pathname === "/people") {
      document.title = "People - CineFlix";
    } else {
      document.title = "Home - CineFlix";
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tranding" element={<Tranding />} />
      <Route path="/popular" element={<Popular />} />
      <Route path="/movie" element={<Movies />} />
      <Route path="/movie/details/:id" element={<MovieDetail />} />
      <Route path="/tv" element={<TvShows />} />
      <Route path="/tv/details/:id" element={<TvCard />} />
      <Route path="/people" element={<People />} />
      <Route path="/person/details/:id" element={<PeopleDetail />} />
    </Routes>
  );
}

export default App;
