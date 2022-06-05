import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainHeader from "./components/MainHeader";
import { CssBaseline } from "@mui/material";
import Router from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext.js";
import { purple, indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: "#01b4e4",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <MainHeader />
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
