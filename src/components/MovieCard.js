import { React } from "react";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { Paper } from "@mui/material";

export default function MovieCard({ movie }) {
  const { name } = useParams();

  return (
    <Paper
      sx={{
        maxHeight: "100%",
        maxWidth: 200,
        m: 0.5,
        flexWrap: "wrap",
        display: "flex",
        borderRadius: 2,
      }}
      elevation={24}
      component={Link}
      to={name ? `/genre/${name}/movie/${movie.id}` : `movie/${movie.id}`}
      id={movie.id}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        alt="#"
      />

      <Divider variant="middle" />
      <Typography variant="subtitle2" component="div">
        {movie.title}
      </Typography>
      <Typography variant="subtitle2" component="div">
        {movie.release_date}
      </Typography>
    </Paper>
  );
}
