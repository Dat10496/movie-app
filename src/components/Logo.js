import { Box } from "@mui/system";
import React from "react";
import Img from "../logoimg.svg";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Box component={Link} to={"/"} sx={{ width: 200 }}>
      <img src={Img} alt="logo" width="100%" />
    </Box>
  );
}

export default Logo;
