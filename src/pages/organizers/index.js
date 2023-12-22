import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrganizers } from "../../redux/organizers/actions";
import SAlert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData, putData } from "../../utils/fetch";
import { setNotif } from "../../redux/notif/actions";
import SelectBox from "../../components/SelectBox";

import { accessOrganizers } from "../../const/access";

function EventPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notif = useSelector((state) => state.notif);
  const organizers = useSelector((state) => state.organizers);

  const [access, setAccess] = useState({
    tambah: false,
    hapus: false,
    edit: false,
  });

  const checkAccess = () => {
    let { role } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};

    const access = { tambah: false, hapus: false, edit: false };
    Object.keys(accessOrganizers).forEach(function (key, index) {
      if (accessOrganizers[key].indexOf(role) >= 0) {
        access[key] = true;
      }
    });
    setAccess(access);
  };

  useEffect(() => {
    checkAccess();
    dispatch(fetchOrganizers());
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/cms/events/${id}`);

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus speaker ${res.data.data.title}`
          )
        );

        dispatch(fetchOrganizers());
      }
    });
  };

  return (
    <Container className="mt-3">
      <Button action={() => navigate("/events/create")}>Tambah</Button>
      <BreadCrumb textSecond={"Events"} />

      {notif.status && (
        <SAlert type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={organizers.status}
        thead={[
          "Judul",
          "Tanggal",
          "Tempat",
          "Status",
          "Kategori",
          "Pembicara",
          "Aksi",
        ]}
        data={organizers.data}
        tbody={[
          "title",
          "date",
          "venueName",
          "statusEvent",
          "categoryName",
          "talentName",
        ]}
        editUrl={`/organizers/edit`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default EventPage;
