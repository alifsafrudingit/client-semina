import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import NavLink from "../NavAccess";
import { useNavigate } from "react-router-dom";
import {
  accessCategories,
  accessTalents,
  accessEvents,
  accessParticipant,
  accessPayments,
  accessOrders,
} from "../../const/access";

export default function SNavbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem("auth")
        ? JSON.parse(localStorage.getItem("auth"))
        : {};

      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink role={role} roles={accessCategories.lihat} to="/">
            Home
          </NavLink>
          <NavLink role={role} roles={accessCategories.lihat} to="/categories">
            Categories
          </NavLink>
          <NavLink role={role} roles={accessTalents.lihat} to="/talents">
            Talents
          </NavLink>
          <NavLink
            role={role}
            roles={accessEvents.lihat}
            action={() => navigate("/events")}
          >
            Events
          </NavLink>
          <NavLink
            role={role}
            roles={accessParticipant.lihat}
            action={() => navigate("/participant")}
          >
            Participant
          </NavLink>
          <NavLink
            role={role}
            roles={accessPayments.lihat}
            action={() => navigate("/payments")}
          >
            Payments
          </NavLink>
          <NavLink
            role={role}
            roles={accessOrders.lihat}
            action={() => navigate("/orders")}
          >
            Payments
          </NavLink>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleLogout()}>LogOut</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
