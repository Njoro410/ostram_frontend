import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { Link } from "react-router-dom";
import Datagrid from "../../components/Datagrid";

const columns = [
  {
    field: "mbr_no",
    headerName: "Member No",
    width: 120,
    headerClassName: "primary-color",
  },
  { field: "id_no", headerName: "ID", width: 50 },
  {
    field: "names",
    headerName: "Name",
    width: 200,
    renderCell: (params) => (
      <strong>
        <Link
          to={`/member-details/${params.row.mbr_no}`}
          preventScrollReset={true}
          style={{
            // textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
          }}
        >
          {params.value}
        </Link>
      </strong>
    ),
    activeClassName: "",
  },
  { field: "phone_no", headerName: "Phone Number", width: 100 },
  { field: "residential", headerName: "Residential Area", width: 120 },
  { field: "next_of_kin", headerName: "Next of Kin", width: 200 },
  { field: "gender", headerName: "Gender", width: 80 },
  { field: "kra_pin", headerName: "KRA Pin", width: 100 },
];

const Memberlist = () => {
  const [tableData, setTabledata] = useState([]);

  const { data: members, isLoading } = useGetMembersQuery();

  useEffect(() => {
    // check if data is available then set members to tableData
    if (members) {
      setTabledata(members.results);
    }
    // setTabledata(members.results);
  });

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="MEMBER LIST" subtitle="A data grid of all members" />
      {/* <div style={{ height: 600, width: "100%" }}> */}
      <Datagrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.mbr_no}
        key={tableData.mbr_no}
      />
      {/* </div> */}
    </Box>
  );
};

export default Memberlist;
