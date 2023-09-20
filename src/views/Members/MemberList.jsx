import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Avatar, Box, Button, useTheme } from "@mui/material";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { Link, useLocation } from "react-router-dom";
import Datagrid, { columnProperties } from "../../components/Datagrid";
import toTitleCase from "../../utils/titleCaseConverter";
import FlexBetween from "../../components/FlexBetween";
import CustomSpinner from "../../components/CustomSpinner";

const Memberlist = () => {
  const theme = useTheme();

  const [tableData, setTabledata] = useState([]);

  const { data: members, isLoading } = useGetMembersQuery({ skip: true });
  useEffect(() => {
    if (members) {
      setTabledata(members.results);
    }
  }, [members]);

  const columns = [
    {
      field: "mbr_no",
      headerName: "Member No",
      headerClassName: "primary-color",
      ...columnProperties,
    },
    {
      field: "image",
      headerName: "",
      renderCell: (params) => <Avatar src={params.value}></Avatar>,
      ...columnProperties,
    },
    {
      field: "names",
      headerName: "Name",
      minWidth: 180,
      renderCell: (params) => (
        <strong>
          <Link
            to={`/member-details/${params.row.mbr_no}`}
            preventScrollReset={true}
            style={{
              textDecoration: "none",
              color: theme.palette.secondary[300],
              "&:hover": {
                color: theme.palette.secondary[100],
              },
            }}
          >
            {toTitleCase(params.value)}
          </Link>
        </strong>
      ),
      activeClassName: "",
      ...columnProperties,
    },
    { field: "id_no", headerName: "ID", ...columnProperties, minWidth: 80 },
    {
      field: "gender",
      headerName: "Gender",
      ...columnProperties,
      minWidth: 80,
    },
    {
      field: "phone_no",
      headerName: "Phone Number",
      ...columnProperties,
      minWidth: 100,
    },
    {
      field: "residential_name",
      headerName: "Residential",
      minWidth: 100,
      ...columnProperties,
    },
    {
      field: "kra_pin",
      headerName: "KRA Pin",
      renderCell: (params) => <p>{params.value ? params.value : "null"}</p>,
      ...columnProperties,
      minWidth: 100,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 100,
      renderCell: (params) => (
        <Link
          to={`/member-update/${params.row.mbr_no}`}
          state={{ member: params.row }}
        >
          <Button variant="contained">Update</Button>
        </Link>
      ),
      ...columnProperties,
    },
  ];

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="MEMBER LIST" subtitle="A list of all members" />
      <FlexBetween borderRadius="9px" gap="3rem">
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <Datagrid
            rows={tableData}
            columns={columns}
            getRowId={(row) => row.mbr_no}
            key={tableData.mbr_no}
          />
        )}
      </FlexBetween>
    </Box>
  );
};

export default Memberlist;
