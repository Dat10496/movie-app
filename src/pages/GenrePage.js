import { React, useEffect, useState } from "react";

import Grid from "@mui/material/Grid";

import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Alert, Container, Paper } from "@mui/material";

import LoadingScreen from "../components/LoadingScreen";
import apiService from "../app/apiService";
import { API_KEY } from "../app/ApiKey";

export default function GenrePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [storageData, setStorageData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/3/movie/${id}/lists?api_key=${API_KEY}`
        );

        setStorageData(response.data);
      } catch (error) {
        setError(error.message);
        console.log(error, "error");
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);
  console.log(storageData);

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
                {storageData && (
                  <Paper sx={{ my: 3, mx: 2, p: 1 }} elevation={24}>
                    <Grid container alignItems="center">
                      <Grid item xs>
                        <Typography gutterBottom variant="h5" component="div">
                          {storageData.title}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography color="text.secondary" variant="body2">
                      {storageData.overview}
                    </Typography>
                    <Divider variant="middle" />
                  </Paper>
                )}{" "}
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
