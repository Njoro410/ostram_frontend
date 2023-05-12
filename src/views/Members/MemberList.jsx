import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { useState } from "react";

const columns = [
  { field: "mbr_no", headerName: "Member No", width: 120 },
  { field: "id_no", headerName: "ID", width: 50 },
  { field: "names", headerName: "Name", width: 200 },
  { field: "phone_no", headerName: "Phone Number", width: 100 },
  { field: "residential", headerName: "Residential Area", width: 120 },
  { field: "next_of_kin", headerName: "Next of Kin", width: 200 },
  { field: "gender", headerName: "Gender", width: 80 },
  { field: "kra_pin", headerName: "KRA Pin", width: 100 },
];

const Memberlist = () => {
  const [tableData, setTabledata] = useState([]);

  const {
    data: members,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetMembersQuery({
    // skip: true,
  });

  useEffect(() => {
    setTabledata(members.data);
    console.log(tableData);
  });

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="MEMBER LIST" subtitle="A data grid of all members" />
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={tableData}
          columns={columns}
          getRowId={(row) => row.mbr_no}
          key={tableData.mbr_no}
        />
      </div>
    </Box>
  );
};

export default Memberlist;
