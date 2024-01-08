import {
  Avatar,
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
  useLazyGetLoanByIdQuery,
  useUpdateLoanMutation,
  useLazyGetMemberLoansQuery,
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
import RHFCheckbox from "../../../components/RHFCheckbox";

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
  font-size: 0.75rem;
`;

const GuaranteeLoan = () => {
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
  } = useForm({});

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
  }, [loanId, triggerFetch]);

  const onSubmitGuarantorsHandler = async (data, e) => {
    e.preventDefault();
    try {
      const response = await updateLoan({
        loanId,
        data,
      }).unwrap();
      setTriggerFetch(true);
    } catch (error) {
      console.error("Loan status update failed:", error);
    }
  };

  useEffect(() => {
    if (triggerFetch) {
      getMemberLoans(memberId).then((response) => {
        setMemberLoans(response.data);
      });
    }
    setTriggerFetch(false);
  }, [triggerFetch]);

  const formatToKES = (amount) => {
    return `KSh ${parseFloat(amount).toLocaleString("en-KE")}`;
  };

  return (
    <Box mt="1rem">
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        borderRadius="0.55rem"
        p="1rem"
        mt="1rem"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          borderRadius="0.55rem"
          paddingRight={1}
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            borderRadius="0.55rem"
            gap="5px"
          >
            <Box gridColumn="span 11" gridRow="span 2">
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
            </Box>{" "}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          // backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          height="fit-content"
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
                  <TableCell align="center">Guaranteed</TableCell>
                  <TableCell align="center">Status</TableCell>
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
                    <TableCell align="center">
                      {loan.guarantors.length > 0 ? (
                        <Chip
                          label="YES"
                          color="success"
                          variant="filled"
                          sx={{
                            border: (theme) =>
                              `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            "& .MuiChip-label": {
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            },
                          }}
                        />
                      ) : (
                        <Chip
                          label="NO"
                          color="warning"
                          variant="filled"
                          sx={{
                            border: (theme) =>
                              `1px solid ${theme.palette.divider}`,
                            borderRadius: 1,
                            "& .MuiChip-label": {
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            },
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">{loan.status_name}</TableCell>
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
            component="form"
            onSubmit={handleSubmit(onSubmitGuarantorsHandler)}
            marginTop={2}
            marginRight={2}
          >
            {" "}
            <Typography sx={{ fontWeight: "bold" }} variant="h5" gutterBottom>
              {" "}
              {toTitleCase(selectedRow?.lendee)}'s{" "}
              {formatToKES(selectedRow?.principal_amount)} Loan Recorded
              Guarantors
            </Typography>
            <Divider />
            <Box display="flex" gap={1} my={1}>
              {selectedRow?.guarantors_list.length === 0 ? (
                <p>No guarantors</p>
              ) : (
                selectedRow?.guarantors_list.map((guarantor) => (
                  <StyledChip
                    key={guarantor.mbr_no}
                    avatar={
                      <Avatar
                        alt={guarantor.name}
                        src="/static/images/avatar/1.jpg"
                      />
                    }
                    label={guarantor.name}
                    variant="filled"
                  />
                ))
              )}
            </Box>
            <RHFAutoComplete
              options={members?.results || []}
              control={control}
              name="guarantors"
              placeholder="Choose guarantors names"
              error={!!errors?.guarantors}
              helperText={errors.guarantors?.message}
              isFetch={isFetching}
              multiple={true}
            />
            <Box display="flex" justifyContent="space-between">
              <RHFCheckbox
                // disabled={selectedRow?.guarantors_list.length === 0}
                label="Notify chosen members via text?"
                control={control}
                name="text"
                padding={3}
                defaultValue={true}
              />
              <RHFCheckbox
                disabled={selectedRow?.guarantors_list.length === 0}
                label="Clear existing guarantors if any present?"
                control={control}
                name="clear"
                padding={3}
                defaultValue={true}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                p: 2,
                backgroundColor: theme.palette.secondary[500],
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: theme.palette.secondary[100],
                },
              }}
            >
              Submit
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default GuaranteeLoan;
