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
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";

import LoadingScreen from "./LoadingScreen";
import { apiService } from "../app/apiService";
import { API_KEY } from "../app/apiKey";
import { uriTransformer } from "react-markdown";
import { Box } from "@mui/system";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function MovieDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [storageData, setStorageData] = useState([]);
  const { id } = useParams();
  console.log(storageData);

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
                <Card
                  sx={{
                    fullWidth: "100%",
                    height: 550,
                    p: 3,
                    backgroundColor: "#edede8",
                  }}
                >
                  <CardActionArea sx={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      height="500"
                      image={`https://image.tmdb.org/t/p/w500${storageData.belongs_to_collection.poster_path}`}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        sx={{ fontFamily: "Comic Sans M", fontStyle: "bold" }}
                        variant="h4"
                        component="div"
                      >
                        {storageData.original_title}
                      </Typography>
                      <Typography gutterBottom variant="h4" component="div">
                        {storageData.release_date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {storageData.overview}
                      </Typography>
                      <Typography
                        sx={{ display: "flex", alignItems: "center" }}
                        component="div"
                      >
                        Vote Rate: {storageData.vote_average}{" "}
                        <StarRateIcon fontSize="large" />
                      </Typography>
                    </CardContent>
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
