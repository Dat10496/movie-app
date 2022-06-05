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
        <Route path="/" element={<HomePages />}>
          <Route path="/page/:page" element={<HomePages />} />
        </Route>
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/genre/:id" element={<GenrePage />} />
        <Route path="/log-in" element={<SignInPage />} />
      </Routes>
    </>
  );
};

export default Router;

/* "/?page=2" HomePage
   "/job/:id" JobCard
   "/login" Login

*/
