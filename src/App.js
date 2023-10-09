import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "./pages/signin";
import DashboardPage from "./pages/dashboard";
import CategoriesPage from "./pages/categories";
import CategoriesCreate from "./pages/categories/create";
import CategoriesEdit from "./pages/categories/edit";
import TalentsPage from "./pages/talents";

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
          <Route
            path="/categories/create"
            element={<CategoriesCreate />}
          ></Route>
          <Route
            path="/categories/edit/:id"
            element={<CategoriesEdit />}
          ></Route>
          <Route path="/talents" element={<TalentsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
