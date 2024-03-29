import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchListCategories,
  fetchListTalents,
} from "../../redux/lists/actions";
import { postData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import { Container } from "react-bootstrap";
import Alert from "../../components/Alert";
import Breadcrumb from "../../components/Breadcrumb";
import Form from "./form";

function EventsCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    title: "",
    date: "",
    file: "",
    avatar: "",
    about: "",
    venueName: "",
    tagline: "",
    keyPoint: [""],
    tickets: [
      {
        type: "",
        status: [""],
        stock: "",
        price: "",
      },
    ],
    category: "",
    talent: "",
    message: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListTalents());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append("avatar", file);
    const res = await postData("/cms/images", formData, true);
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
          console.log("res");
          console.log(res);
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
          message: "Type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else if (e.target.name === "category" || e.target.name === "talent") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload = {
      title: form.title,
      date: form.date,
      about: form.about,
      image: form.file,
      price: form.price,
      venueName: form.venueName,
      tagline: form.tagline,
      keyPoint: form.keyPoint,
      category: form.category.value,
      talent: form.talent.value,
      status: form.status,
      tickets: form.tickets,
    };

    const res = await postData("/cms/events", payload);
    if (res?.data?.data) {
      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah event ${res.data.data.title}`
        )
      );
      navigate("/events");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setNotif({
        ...alert,
        status: true,
        type: "danger",
        message: res.response.data.msg,
      });
    }
  };

  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint];

    _temp[i] = e.target.value;

    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];

    _temp.push("");

    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };

  const handleChangeTicket = (e, i) => {
    let _temp = [...form.tickets];

    _temp[i][e.target.name] = e.target.value;

    setForm({ ...form, tickets: _temp });
  };

  const handlePlusTicket = () => {
    let _temp = [...form.tickets];
    _temp.push({
      type: "",
      status: "",
      stock: "",
      price: "",
    });

    setForm({ ...form, tickets: _temp });
  };

  const handleMinusTicket = (index) => {
    let _temp = [...form.tickets];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, tickets: _temp });
  };

  return (
    <Container>
      <Breadcrumb
        textSecond={"Events"}
        urlSecond={"/events"}
        textThird="Edit"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
        handleChangeTicket={handleChangeTicket}
        handlePlusTicket={handlePlusTicket}
        handleMinusTicket={handleMinusTicket}
      />
    </Container>
  );
}

export default EventsCreate;
