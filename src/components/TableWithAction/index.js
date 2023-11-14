import React from "react";
import { Pagination, Table } from "react-bootstrap";
// import Pagination from "../Pagination";
import Thead from "../Thead";
import Tbody from "../TbodyWithAction";

function TableWithAction({
  withoutPagination,
  handlePageClick,
  actionNotDisplay,
  data,
  thead,
  tbody,
  editUrl,
  deleteAction,
  customAction,
  status,
  page,
}) {
  return (
    <>
      <Table striped bordered hover>
        <Thead text={thead} />
        <Tbody
          status={status}
          data={data}
          display={tbody}
          editUrl={editUrl}
          deleteAction={deleteAction}
          actionNotDisplay={actionNotDisplay}
          customAction={customAction}
        />
      </Table>
      {/* {!withoutPagination && data.length ? (
        <Pagination pages={page} handlePageClick={handlePageClick} />
      ) : (
        ""
      )} */}
    </>
  );
}

export default TableWithAction;
