import React from "react";
import { Card, CardBody, CardTitle, Container } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { config } from "../../configs";
import SForm from "./form";
import { postData } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";

function PageSignIn() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData(`/cms/auth/signin`, form);

      dispatch(userLogin(res.data.data.token, res.data.data.role));
      setAlert({
        status: false,
      });
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        message: err?.response?.data?.msg ?? "Internal Server Error",
        type: "danger",
      });
    }
  };

  // if (token) return <Navigate to="/" replace={true}></Navigate>;

  return (
    <Container md={12} className="my-5">
      <div className="m-auto" style={{ width: "50%" }}>
        {alert.status && <SAlert type="danger" message={alert.message} />}
      </div>
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <CardBody>
          <CardTitle className="text-center">Sign In</CardTitle>
          <SForm
            form={form}
            handleChange={handleChange}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </CardBody>
      </Card>
    </Container>
  );
}

export default PageSignIn;
