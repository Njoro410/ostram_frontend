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
import { processMemberIdSchema } from "../../../utils/validationSchema";
import LoanDocumentCard from "../../../components/LoanComponents/LoanDocumentCard";
import { useGetMembersQuery } from "../../../services/members/memberSlices";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import styled from "@emotion/styled";
import toTitleCase from "../../../utils/titleCaseConverter";
import formatDate from "../../../utils/formatDate";
import RHFCheckbox from "../../../components/RHFCheckbox";
import LoanDetailsTable from "../../../components/LoanComponents/LoanDetailsTable";

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

const CancelLoan = () => {
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
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(processMemberIdSchema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    setMemberId(data.member);
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
      const cancelledLoan = status?.results.find(
        (s) => s.status_name === "CANCELLED"
      );
      if (cancelledLoan) {
        const textNotify = watch("text");
        const response = await updateLoan({
          loanId,
          data: { id: cancelledLoan.id, text: textNotify }, // Update data property to send object with id key
        });
        console.log(response);
      } else {
        console.log("No loan found with an CANCELLED status");
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
            name="member"
            placeholder="Choose a member to see their loans"
            error={!!errors?.member}
            helperText={errors.member?.message}
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

        {memberId ? (
          <Box
            gridColumn="span 4"
            gridRow="span 4"
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.55rem"
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
            }}
          >
            <LoanDetailsTable
              loans={memberLoans?.results}
              onRowClick={handleRowClick}
            />
          </Box>
        ) : null}
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
                      {formatDate(selectedRow?.application_date)}
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
            <RHFCheckbox
              disabled={selectedRow?.status_name === "CANCELLED"}
              label={`Notify ${toTitleCase(
                selectedRow?.lendee
              )} via text message`}
              control={control}
              name="text"
              padding={3}
              defaultValue={true}
            />
            {selectedRow?.status_name == "CANCELLED" ? (
              <Button
                type="submit"
                onClick={() => handleUpdateStatus(loanId)}
                fullWidth
                disabled
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
                Canceled
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={() => handleUpdateStatus(loanId)}
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
                Cancel Loan Application
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

export default CancelLoan;
