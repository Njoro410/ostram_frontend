import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { Link, useNavigate } from "react-router-dom";

const columns = [
  { field: "mbr_no", headerName: "Member No", width: 120 },
  { field: "id_no", headerName: "ID", width: 50 },
  {
    field: "names",
    headerName: "Name",
    width: 200,
    renderCell: (params) => (
      <strong>
        {/* create a link which when clicked takes in the member number and redirects to a page */}
        {/* <a href={`/member-details/${params.row.mbr_no}`}>{params.value}</a> */}
        <Link to={`/member-details/${params.row.mbr_no}`}>{params.value}</Link>
      </strong>
    ),
  },
  { field: "phone_no", headerName: "Phone Number", width: 100 },
  { field: "residential", headerName: "Residential Area", width: 120 },
  { field: "next_of_kin", headerName: "Next of Kin", width: 200 },
  { field: "gender", headerName: "Gender", width: 80 },
  { field: "kra_pin", headerName: "KRA Pin", width: 100 },
];

const Memberlist = () => {
  const navigate = useNavigate();
  const [tableData, setTabledata] = useState([]);

  const { data: members, isLoading } = useGetMembersQuery();

  useEffect(() => {
    // check if data is available then set members to tableData
    setTabledata(members.results);
    console.log(members, "response");
    console.log(tableData, "set data");
  });

  const handleRowClick = (param) => {
    const memberNo = param.row.mbr_no;
    navigate(`/member-details/${memberNo}`);
  };

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="MEMBER LIST" subtitle="A data grid of all members" />
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(row) => row.mbr_no}
          key={tableData.mbr_no}
          onRowClick={handleRowClick}
        />
      </div>
    </Box>
  );
};

export default Memberlist;
