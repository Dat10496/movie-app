import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePages from "../pages/HomePage";
import MovieDetail from "../components/MovieDetail";
import SignInPage from "../pages/SignInPage";
import GenrePage from "../pages/GenrePage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<HomePages />} />
          <Route path="/genre/:name" element={<GenrePage />} />
        </Route>
        <Route path="/genre/:name/:page" element={<GenrePage />} />
        <Route path="/page/:page" element={<HomePages />} />
        <Route path="/genre/:name/movie/:id" element={<MovieDetail />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/log-in" element={<SignInPage />} />
      </Routes>
    </>
  );
};

export default Router;
