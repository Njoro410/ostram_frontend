import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RHFAutoComplete from "../../../components/RHFAutoComplete";
import {
  useGetAllLoansQuery,
  useGetLoanStatusQuery,
  useLazyGetLoanByIdQuery,
  useLazyGetLoanDocumentsQuery,
  useLazyGetMemberLoansQuery,
  useUpdateLoanMutation,
} from "../../../services/loans/loanSlices";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkLoanDocumentSchema } from "../../../utils/validationSchema";
import LoanDocumentCard from "../../../components/LoanComponents/LoanDocumentCard";
import { useGetMembersQuery } from "../../../services/members/memberSlices";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import styled from "@emotion/styled";
import toTitleCase from "../../../utils/titleCaseConverter";
import formatDate from "../../../utils/formatDate";

const GlassCard = styled(Card)`
  background-color: rgba(87, 86, 86, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 10px;
  /* width:20rem */
`;

const StyledCardHeader = styled(CardHeader)`
  .MuiCardHeader-title {
    color: #f3f3f3;
    font-weight: bold;
  }
`;

const StyledChip = styled(Chip)`
  font-weight: bold;
  font-size: 0.85rem;
`;

const DisburseLoan = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [memberId, setMemberId] = useState();
  const [memberLoans, setMemberLoans] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loanId, setLoanId] = useState(null);
  const { data: members, isFetching } = useGetMembersQuery();
  const [getMemberLoans] = useLazyGetMemberLoansQuery();
  const [getLoanById] = useLazyGetLoanByIdQuery();
  const [updateLoan, { isLoading }] = useUpdateLoanMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(checkLoanDocumentSchema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    setMemberId(data.loan);
    setTriggerFetch(true);
  };

  const handleRowClick = (loan_Id) => {
    setLoanId(loan_Id);
  };

  useEffect(() => {
    if (loanId) {
      getLoanById(loanId).then((response) => {
        setSelectedRow(response.data?.results);
      });
    }
  }, [loanId]);

  useEffect(() => {
    if (triggerFetch) {
      getMemberLoans(memberId).then((response) => {
        setMemberLoans(response.data);
      });
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  const { data: status } = useGetLoanStatusQuery();

  const handleUpdateStatus = async (loanId) => {
    try {
      const approvedLoan = status?.results.find(
        (s) => s.status_name === "DISBURSED"
      );
      if (approvedLoan) {
        const response = await updateLoan({
          loanId,
          data: { id: approvedLoan.id }, // Update data property to send object with id key
        });
        console.log(response);
      } else {
        console.log("No loan found with an APPROVED status");
      }
    } catch (error) {
      console.error("Loan status update failed:", error);
    }
  };

  const formatToKES = (amount) => {
    return `KSh ${parseFloat(amount).toLocaleString("en-KE")}`;
  };

  return (
    <Box mt="1rem">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        borderRadius="0.55rem"
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        p="1rem"
        mt="1rem"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 7"
          gridRow="span 2"
          borderRadius="0.55rem"
          paddingRight={1}
        >
          <RHFAutoComplete
            options={members?.results || []}
            control={control}
            name="loan"
            placeholder="Choose a member to see their loans"
            error={!!errors?.loan}
            helperText={errors.loan?.message}
            isFetch={isFetching}
            multiple={false}
          />
        </Box>
        <Box gridColumn="span 1" gridRow="span 2" borderRadius="0.55rem">
          <Button
            type="submit"
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "13px 20px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
            }}
          >
            Submit
          </Button>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 4"
          // backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          // height="12rem"
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <TableContainer
            elevation={1}
            sx={{
              backgroundColor: theme.palette.background.alt,
              maxHeight: "300px",
            }}
            component={Paper}
          >
            <Table aria-label="member loans table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Principal Amount</TableCell>
                  <TableCell align="center">Remaining Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {memberLoans?.results.map((loan) => (
                  <TableRow
                    key={loan.id}
                    onClick={() => handleRowClick(loan.id)}
                    sx={{
                      "&:last-child tg,&:last-child th": { border: 0 },
                      cursor: "pointer",
                    }}
                  >
                    <TableCell align="center">{loan.id}</TableCell>
                    <TableCell align="center">{loan.status_name}</TableCell>
                    <TableCell align="center">
                      {loan.principal_amount}
                    </TableCell>
                    <TableCell align="center">
                      {loan.remaining_balance}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {selectedRow ? (
          <Box
            gridColumn="span 8"
            gridRow="span 4"
            borderRadius="0.55rem"
            marginTop={2}
            marginRight={2}
          >
            <GlassCard variant="outlined">
              <FlexBetween>
                <StyledCardHeader
                  title={
                    <Typography
                      sx={{ fontWeight: "bold", fontSize: "1.4rem" }}
                      gutterBottom
                      variant="h5"
                      // display="block"
                    >
                      {toTitleCase(selectedRow?.lendee)}{" "}
                      {formatDate(selectedRow?.application_date)}{" "}
                      {formatDate(selectedRow?.start_date)}
                    </Typography>
                  }
                />

                <StyledChip
                  label={selectedRow?.status_name}
                  variant="filled"
                  color={
                    selectedRow?.status_name === "ACCEPTED"
                      ? "success"
                      : selectedRow?.status_name === "PENDING"
                      ? "primary"
                      : selectedRow?.status_name === "REJECTED"
                      ? "error"
                      : "primary"
                  }
                />
              </FlexBetween>
              <Divider />
              <CardContent>
                <FlexBetween>
                  <Box>
                    <Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.85rem" }}
                          variant="caption"
                          gutterBottom
                        >
                          {" "}
                          Remaining Balance
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="h4"
                          gutterBottom
                        >
                          {" "}
                          {formatToKES(selectedRow?.remaining_balance)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Box>
                    <Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.85rem" }}
                          variant="caption"
                          gutterBottom
                        >
                          {" "}
                          Total Payable
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="h4"
                          gutterBottom
                        >
                          {" "}
                          {formatToKES(selectedRow?.total_payment)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Box>
                    <Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.85rem" }}
                          variant="caption"
                          gutterBottom
                        >
                          {" "}
                          Principal Amount
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="h4"
                          gutterBottom
                        >
                          {" "}
                          {formatToKES(selectedRow?.principal_amount)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Box>
                    <Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.85rem" }}
                          variant="caption"
                          gutterBottom
                        >
                          {" "}
                          Monthly Installment
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="h4"
                          gutterBottom
                        >
                          {" "}
                          {formatToKES(selectedRow?.monthly_payment)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Divider orientation="vertical" variant="middle" flexItem />
                  <Box>
                    <Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.85rem" }}
                          variant="caption"
                          gutterBottom
                        >
                          {" "}
                          Total Interest
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="h4"
                          gutterBottom
                        >
                          {" "}
                          {formatToKES(selectedRow?.total_interest)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </FlexBetween>
              </CardContent>
            </GlassCard>
            {selectedRow?.status_name == "DISBURSED" ? (
              <Button
                type="submit"
                fullWidth
                disabled
                onClick={() => handleUpdateStatus(loanId)}
                variant="contained"
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: theme.palette.secondary[500],
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary[100],
                  },
                }}
              >
                Disbursed
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                onClick={() => handleUpdateStatus(loanId)}
                variant="contained"
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: theme.palette.secondary[500],
                  color: "black",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: theme.palette.secondary[100],
                  },
                }}
              >
                Disburse
              </Button>
            )}
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default DisburseLoan;
