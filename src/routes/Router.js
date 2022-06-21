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
          <Route index element={<HomePages />} />
          <Route path="/page/:page" element={<HomePages />} />
          <Route path="/page/:page/movie/:id" element={<MovieDetail />} />
          <Route path="/genre/:name" element={<GenrePage />} />
          <Route path="/genre/:name/:page" element={<GenrePage />} />
          <Route path="/genre/:name/movie/:id" element={<MovieDetail />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Route>
        <Route>
          <Route path="/log-in" element={<SignInPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
