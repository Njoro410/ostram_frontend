import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  Box,
  Collapse,
} from "@mui/material";
import styled from "@emotion/styled";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Grow from "@mui/material/Grow";

const rowsPerPageOptions = [5, 10, 25];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.alt,
    color: theme.palette.neutral,
    fontWeight: "bolder",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "light",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.background.alt,
  },
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.background.default,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    cursor: "pointer",
  },
}));

const AllStaff = ({ users }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [collapsed, setCollapsed] = useState(false);
  const [checked, setChecked] = useState(false);


  useEffect(() => {
    setCollapsed(true);
    setChecked(true);
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  };

  return (
    <Collapse in={collapsed}>
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer
          component={Paper}
          elevation={8}
          sx={{
            border: (theme) => `2px solid ${theme.palette.divider}`,
            borderRadius: 1,
            maxHeight: 500,
            mt: 2,
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={() => handleSortRequest("id")}
                  >
                    ID
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "username"}
                    direction={orderBy === "username" ? order : "asc"}
                    onClick={() => handleSortRequest("username")}
                  >
                    Username
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={orderBy === "email" ? order : "asc"}
                    onClick={() => handleSortRequest("email")}
                  >
                    Email
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "first_name"}
                    direction={orderBy === "first_name" ? order : "asc"}
                    onClick={() => handleSortRequest("first_name")}
                  >
                    First Name
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "last_name"}
                    direction={orderBy === "last_name" ? order : "asc"}
                    onClick={() => handleSortRequest("last_name")}
                  >
                    Last Name
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "is_admin"}
                    direction={orderBy === "is_admin" ? order : "asc"}
                    onClick={() => handleSortRequest("is_admin")}
                  >
                    Admin
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell>
                  <TableSortLabel
                    active={orderBy === "is_active"}
                    direction={orderBy === "is_active" ? order : "asc"}
                    onClick={() => handleSortRequest("is_active")}
                  >
                    Active
                  </TableSortLabel>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <Grow
                    in={checked}
                    {...(checked ? { timeout: (index + 1) * 500 } : {})}
                    key={row.id}
                  >
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.id}</StyledTableCell>
                      <StyledTableCell>{row.username}</StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell>{row.first_name}</StyledTableCell>
                      <StyledTableCell>{row.last_name}</StyledTableCell>
                      <StyledTableCell>
                        {row.is_admin ? (
                          <CheckCircleIcon sx={{ color: "#66ff00" }} />
                        ) : (
                          <CancelIcon sx={{ color: "red" }} />
                        )}
                      </StyledTableCell>
                      <StyledTableCell>
                        {row.is_active ? (
                          <CheckCircleIcon sx={{ color: "#66ff00" }} />
                        ) : (
                          <CancelIcon sx={{ color: "red" }} />
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  </Grow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={users?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>{" "}
    </Collapse>
  );
};

export default AllStaff;
