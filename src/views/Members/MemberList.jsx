import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Avatar,
  Box,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
  IconButton,
  InputBase,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { Link } from "react-router-dom";
import Datagrid from "../../components/Datagrid";
import toTitleCase from "../../utils/titleCaseConverter";
import FlexBetween from "../../components/FlexBetween";

const Memberlist = () => {
  const theme = useTheme();
  //     set search query to empty string
  const [query, setQuery] = useState("");
  const [searchParam] = useState(["names"]);

  const [tableData, setTabledata] = useState([]);

  const { data: members, isLoading } = useGetMembersQuery();

  useEffect(() => {
    // check if data is available then set members to tableData
    if (members) {
      setTabledata(members.results);
    }
    // setTabledata(members.results);
  });

  const columns = [
    {
      field: "mbr_no",
      headerName: "Member No",
      headerClassName: "primary-color",
    },
    {
      field: "image",
      headerName: "",
      renderCell: (params) => <Avatar src={params.value}></Avatar>,
      sortable: false,
      filterable: false,
    },
    {
      field: "names",
      headerName: "Name",
      width: 260,
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
      sortable: false,
    },
    { field: "id_no", headerName: "ID", sortable: false },
    {
      field: "gender",
      headerName: "Gender",
      sortable: false,
      filterable: false,
    },
    { field: "phone_no", headerName: "Phone Number", sortable: false },
    {
      field: "residential",
      headerName: "Residential",
      width: 120,
      sortable: false,
      filterable: false,
    },
    {
      field: "kra_pin",
      headerName: "KRA Pin",
      renderCell: (params) => <p>{params.value ? params.value : "null"}</p>,
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => <Button variant="contained">Update</Button>,
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="MEMBER LIST" subtitle="A data grid of all members" />
      {/* <div style={{ height: 600, width: "100%" }}> */}
      <FlexBetween
        // backgroundColor={theme.palette.background.alt}
        borderRadius="9px"
        gap="3rem"
        p="0.1rem 1.5rem"
      >
        <InputBase
          placeholder="Search..."
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton>
          <Search />
        </IconButton>
      </FlexBetween>
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
