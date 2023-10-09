import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/signin";
import DashboardPage from "./pages/dashboard";
import CategoriesPage from "./pages/categories";

import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="signin" element={<SignInPage />}></Route>
          <Route path="/" element={<DashboardPage />}></Route>
          <Route path="/categories" element={<CategoriesPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
