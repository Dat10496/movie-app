import { React } from "react";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { Box, Card } from "@mui/material";

export default function MovieCard({ movie }) {
  const { name } = useParams();

  return (
    <Card
      sx={{
        maxHeight: "100%",
        maxWidth: 200,
        m: 1,
        flexWrap: "wrap",
        display: "flex",
        textDecoration: "none",
        justifyContent: "flex-start",
        p: 0.5,
        borderRadius: 3,
      }}
      component={Link}
      to={name ? `/genre/${name}/movie/${movie.id}` : `movie/${movie.id}`}
      id={movie.id}
    >
      <img
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        alt={movie.title}
      />

      <Box>
        <Typography
          sx={{
            fontFamily: "Rubik",
            fontWeight: "bold",
          }}
          variant="h6"
        >
          {movie.title}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontFamily: "roboto", color: "#828281", fontSize: 18 }}
        >
          {movie.release_date}
        </Typography>
      </Box>
    </Card>
  );
}
