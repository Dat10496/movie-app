import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_KEY } from "../app/ApiKey";
import apiService from "../app/apiService";

function GenresList() {
  const [genresList, setGenresList] = useState([]);
  const [genresMovie, setGenresMovie] = useState([]);
  const [genre, setGenre] = useState("");
  console.log(genre);

  const handleChange = () => {
    setGenre(genresList.name);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenresList(response.data.genres);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchData();
  }, []);

  const getListOfMovie = async (genres_id) => {
    try {
      const res = await apiService.get(
        `/3/movie/${genres_id}/lists?api_key=${API_KEY}&language=en-US&page=1`
      );
      setGenresMovie(res.data.results);
      setGenre(genresList);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Genres</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={genre}
          label="Genre"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genresList.map((genre) => (
            <MenuItem
              key={genre.id}
              onClick={() => getListOfMovie(genre.id)}
              value={genre.name}
              onChange={handleChange}
              component={Link}
              to={`/genre/${genre.id}`}
            >
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default GenresList;
