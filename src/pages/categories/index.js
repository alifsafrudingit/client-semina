import React, { useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import SButton from "../../components/Button";
import SBreadcrumb from "../../components/Breadcrumb";
import { useNavigate } from "react-router-dom";
import SAlert from "../../components/Alert";
import Swal from "sweeaalert2";
import { deleteData } from "../../utils/fetch";
import { fetchCategories } from "../../redux/categories/actions";
import { useDispatch, useSelector } from "react-redux";

export default function PageCategories() {
  const dispatch = useDispatch();
  const { categories, notif } = useSelector((state) => state);

  const navigate = useNavigate();

  return (
    <>
      <Container className="mt-3">
        <div>
          <SBreadcrumb textSecond="Categories" />
        </div>
        <SButton action={() => navigate("/categories/create")}>Tambah</SButton>
        <Table striped bordered hover variant="dark" className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Kategori</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  <div className="flex items-center justify-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.name}</td>
                  <td>Otto</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
