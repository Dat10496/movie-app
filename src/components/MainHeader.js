import { React, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchParams from "./SearchParams";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, InputBase, Modal, Paper } from "@mui/material";
import useAuth from "../hooks/useAuth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logo from "./Logo";

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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  with: 300,
  height: 400,
};

export default function MainHeader() {
  let { user, logout } = useAuth();
  let navigate = useNavigate();
  const location = useLocation();
  const { name } = useParams();
  console.log(name);

  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);

  const Logout = async () => {
    logout(() => navigate("/"));
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#0d253f" }}>
      <AppBar position="static">
        <Toolbar>
          <Logo />

          <Search onClick={handleOpenSearch}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Modal
            open={openSearch}
            onClose={handleCloseSearch}
            sx={{
              width: 500,
              height: 500,
              position: "absolute",
              left: 400,
              top: 80,
            }}
          >
            <Paper elevation={24} sx={style} mt={0.5}>
              <SearchParams />
            </Paper>
          </Modal>
          <p>{name}</p>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              p: 0.5,
            }}
          >
            {user ? (
              <>
                <AccountCircle sx={{ mr: 1 }} />
                {user.username}{" "}
              </>
            ) : (
              ""
            )}
            {user ? (
              <Button
                state={{ from: location }}
                component={Link}
                to={"/"}
                onClick={Logout}
              >
                <LoginIcon sx={{ color: "white" }}></LoginIcon>
              </Button>
            ) : (
              <Button
                state={{ from: location }}
                component={Link}
                to={"/log-in"}
              >
                <LoginIcon sx={{ color: "white" }}></LoginIcon>
              </Button>
            )}

            {user ? (
              <Typography
                component={Link}
                to={"/"}
                state={{ from: location }}
                sx={{ color: "white", textDecoration: "none" }}
                onClick={Logout}
              >
                Sign out
              </Typography>
            ) : (
              <Typography
                component={Link}
                to={"/log-in"}
                state={{ from: location }}
                sx={{ color: "white", textDecoration: "none" }}
              >
                Sign in
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
