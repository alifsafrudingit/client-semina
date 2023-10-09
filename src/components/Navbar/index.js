import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import NavLink from "../Navlink";
import { useNavigate } from "react-router-dom";

export default function SNavbar() {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink action={() => navigate("/categories")}>Categories</NavLink>
          <NavLink action={() => navigate("/speakers")}>Speakers</NavLink>
          <NavLink action={() => navigate("/events")}>Events</NavLink>
          <NavLink action={() => navigate("/participant")}>Participant</NavLink>
          <NavLink action={() => navigate("/transactions")}>
            Transactions
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
