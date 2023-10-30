import React from "react";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { listen } from "./redux/listener";
import { AppRoutes } from "./routes";

import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  useEffect(() => {
    listen();
  }, []);

  return (
    <Container>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Container>
  );
}

export default App;
