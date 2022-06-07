import { React, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {
  Alert,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Rating,
} from "@mui/material";
import { useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import { apiService } from "../app/apiService";
import { API_KEY } from "../app/apiKey";

export default function MovieDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [storageData, setStorageData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(
          `/3/movie/${id}?api_key=${API_KEY}`
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

  return (
    <>
      <Container
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 3,
          p: 1,
          m: 2,
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
                <Card
                  sx={{
                    fullWidth: "100%",
                    fullHeight: "100%",
                    p: 3,
                    backgroundColor: "#e6d3a5",
                  }}
                >
                  <CardActionArea
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="600"
                      image={`https://image.tmdb.org/t/p/w500${storageData.poster_path}`}
                      alt={storageData.title}
                    />

                    <Grid item xs={12} md={6}>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          color: "",
                          p: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontWeight: "bold",
                            fontSize: 35,
                            m: 1,
                          }}
                          variant="h3"
                        >
                          {storageData.original_title}
                          <Divider />
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Raleway",
                            fontSize: 15,
                            fontStyle: "italic",
                            m: 1,
                          }}
                          variant="subtitle2"
                          component="div"
                        >
                          Date Release: {storageData.release_date}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: "Ubuntu",
                            fontWeight: "bold",
                            m: 1,
                          }}
                        >
                          Overview
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Ubuntu", ml: 1 }}
                        >
                          {storageData.overview}
                        </Typography>

                        <Rating
                          value={storageData.vote_average}
                          precision={0.1}
                          readOnly
                          max={10}
                          m={1}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", ml: 1 }}
                        >
                          ({storageData.vote_count} reviews)
                        </Typography>
                      </CardContent>
                    </Grid>
                  </CardActionArea>
                </Card>
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
