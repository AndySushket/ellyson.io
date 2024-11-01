import React, { useEffect } from "react";

import "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import Header from "./Header";
import Routing from "./Routing";

import { analytics, logEvent } from "../firebase/firebaseConfig";

const theme = createTheme({});

export default function App() {
  useEffect(() => {
    logEvent(analytics, "page_view");
  }, []);

  const url = window.location.pathname;
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Routing />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
