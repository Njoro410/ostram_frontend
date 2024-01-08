import styled from "@emotion/styled";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import React from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import CustomLinearProgress from "../CustomLinearProgress";

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

const LoanDetailsTable = ({ loans, onRowClick, isLoading }) => {
  const theme = useTheme();
  return (
    <TableContainer
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.alt,
        // maxHeight: "100px",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
      component={Paper}
    >
      {isLoading ? (
        <CustomLinearProgress />
      ) : (
        <Table aria-label="member loans table" stickyHeader>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Principal Amount</StyledTableCell>
              <StyledTableCell align="center">
                Remaining Balance
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {loans?.map((loan) => (
              <StyledTableRow
                key={loan.id}
                onClick={() => onRowClick(loan.id)}
                sx={{
                  "&:last-child tg,&:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <StyledTableCell align="center">{loan.id}</StyledTableCell>
                <StyledTableCell align="center">
                  {loan.status_name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {loan.principal_amount}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {loan.remaining_balance}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default LoanDetailsTable;
