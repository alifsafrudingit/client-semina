import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import SBreadCrumb from "../../components/Breadcrumb";
import SAlert from "../../components/Alert";
import Form from "./form";
import SBreadcrumb from "../../components/Breadcrumb";

function TalentsCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    role: "",
    file: "",
    avatar: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/cms/images", formData, true);
    console.log("res");
    console.log(res);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === "avatar") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "Tipe image jpg | png | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      image: form.file,
      role: form.role,
      name: form.name,
    };

    const res = await postData("/cms/talents", payload);
    console.log("res");
    console.log(res);

    if (res.data.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah talent ${res.data.data.name}`
        )
      );
      navigate("/talents");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  return (
    <Container>
      <SBreadcrumb
        textSecond={"Talents"}
        urlSecond={"/talents"}
        textThird="Create"
      />
      {alert.status && <SAlert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default TalentsCreate;
