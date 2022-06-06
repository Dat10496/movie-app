import { React, useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Container,
  Pagination,
  PaginationItem,
  Paper,
} from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { apiService } from "../app/apiService";
import { API_KEY } from "../app/apiKey";
import MovieCard from "../components/MovieCard";

export default function GenrePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [storageData, setStorageData] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const { name, page } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/3/search/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=${page}&include_adult=false&genre=${name}`
        );

        setStorageData(response.data.results);
        setTotalPage(response.data.total_pages);
      } catch (error) {
        setError(error.message);
        console.log(error, "error");
      }
      setLoading(false);
    };

    fetchData();
  }, [name, page]);

  return (
    <>
      <Container
        sx={{
          width: "100%",
          maxWidth: 360,
          borderRadius: 3,
          p: 1,
          mt: 2,
        }}
      >
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {" "}
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    label={name}
                    sx={{
                      display: "flex",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      flexWrap: "wrap",
                      justifyContent: "space-evenly",
                      p: 0,
                    }}
                  >
                    {storageData.map((movie) => (
                      <Grid key={movie.id} item xs={12} md={5}>
                        <MovieCard movie={movie} />
                      </Grid>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", m: 1 }}>
                  <Pagination
                    count={totalPage}
                    color="primary"
                    renderItem={(item) => (
                      <PaginationItem
                        component={Link}
                        to={`/genre/${name}/${item.page}`}
                        {...item}
                      />
                    )}
                  />
                </Box>{" "}
                {!storageData && (
                  <Typography variant="h6">404 Movie not found!</Typography>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
