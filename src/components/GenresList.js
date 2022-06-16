import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../app/apiService";
import { API_KEY } from "../app/apiKey";

function GenresList() {
  const [genresList, setGenresList] = useState([]);
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const handleChange = (genre) => {
    setGenre(genre);
    navigate(`/genre/${genre}`);
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

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Genres</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={genre}
          label="Genre"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {genresList.map((genre) => (
            <MenuItem
              key={genre.id}
              onClick={() => handleChange(genre.name)}
              value={genre.name}
              sx={{ color: "#0d253f" }}
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
