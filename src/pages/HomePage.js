import { React, useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import {
  Box,
  Container,
  Grid,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { apiService } from "../app/apiService";
import GenresList from "../components/GenresList";
import { API_KEY } from "../app/apiKey";

function HomePages() {
  const [storageData, setStorageData] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const { page } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
        );
        const result = response.data.results;
        setStorageData(result);
        setTotalPage(response.data.total_pages);
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchData();
  }, [page]);

  return (
    <>
      <Container sx={{ minHeight: "100vh", mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Stack>
            <GenresList />
          </Stack>
          <Box
            sx={{
              display: "flex",
              maxWidth: "100%",
              maxHeight: "100%",
              flexWrap: "wrap",
              justifyContent: "flex-end",
              p: 0,
            }}
          >
            {storageData.map((movie) => (
              <Grid key={movie.id} item xs={12} md={6}>
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
                to={`/page/${item.page}`}
                {...item}
              />
            )}
          />
        </Box>
      </Container>
    </>
  );
}

export default HomePages;
