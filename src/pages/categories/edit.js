import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SBreadcrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import SForm from "./form";
import axios from "axios";

export default function CategoryEdit() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
  });

  const [alert, setAlert] = useState({
    status: "false",
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchOneCategories = async (categoryId) => {
    const res = await axios.put(`api/v1/categories/${categoryId}`);
    setForm({ ...form, name: res.data.data.name });
  };

  useEffect(() => {
    fetchOneCategories();
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      navigate("/categories");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: err.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadcrumb
        textSecond={"Categories"}
        urlSecond={"/categories"}
        textThird="Edit"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <SForm
        edit
        form={form}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Container>
  );
}
