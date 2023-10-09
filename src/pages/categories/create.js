import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SBreadcrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";

export default function CategoryCreate() {
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
        textThird="Create"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Container>
  );
}
