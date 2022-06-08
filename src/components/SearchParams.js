import { React, useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Paper, alpha, Divider, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { apiService } from "../app/apiService";
import { Link } from "react-router-dom";
import { API_KEY } from "../app/apiKey";
import { Box } from "@mui/system";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const style = {
  position: "relative",
  top: "45%",
  left: "50%",
  backgroundColor: "#0d253f",
  color: "white",
  transform: "translate(-50%, -50%)",
  with: 300,
  height: 550,
  p: 0,
  textDecoration: "none",
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function SearchParams() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const [storageData, setStorageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(
          `/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`
        );
        const result = response.data.results;
        setStorageData(result);
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchData();
  }, [query]);

  return (
    <Paper elevation={24} sx={style}>
      <Search
        value={searchParams.get("query") || ""}
        onChange={(event) => {
          let query = event.target.value;
          if (query) {
            setSearchParams({ query });
            setQuery(query);
          } else {
            setSearchParams({});
          }
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 0.5,
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Divider variant="middle" color="primary.dark" sx={{ mt: 1 }} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          ml: 1,
          flexDirection: "column",
          textDecoration: "none",
          color: "white",
        }}
      >
        {storageData.map((movie) => (
          <Typography
            key={movie.id}
            component={Link}
            to={`/movie/${movie.id}`}
            sx={{ textDecoration: "none", color: "white" }}
          >
            {movie.title}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}

export default SearchParams;
