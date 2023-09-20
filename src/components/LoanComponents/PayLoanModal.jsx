import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useLazyGetLoanByIdQuery,
  useLazyGetMemberLoansQuery,
  usePayLoanMutation,
} from "../../services/loans/loanSlices";
import {
  PayLoanSchema,
  processMemberIdSchema,
} from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import DateSelector from "../DateSelector";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import RHFAutoComplete from "../RHFAutoComplete";
import LoanDetailsTable from "./LoanDetailsTable";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { useEffect } from "react";
import { GlassDialog } from "../GlassDialog";
import toTitleCase from "../../utils/titleCaseConverter";
import formatToKes from "../../utils/formatToKes";

const PayLoanModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [memberId, setMemberId] = useState();
  const [loanId, setLoanId] = useState(null);
  const [memberLoans, setMemberLoans] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data: members, isFetching } = useGetMembersQuery();
  const [getMemberLoans, { isLoading }] = useLazyGetMemberLoansQuery();
  const [getLoanById] = useLazyGetLoanByIdQuery();

  const {
    handleSubmit: handleSubmitForMember,
    formState: { errors: memberErrors },
    reset: resetMember,
    control: memberControl,
  } = useForm({
    resolver: yupResolver(processMemberIdSchema),
  });

  const {
    register,
    handleSubmit: handleSubmitForLoan,
    formState: { errors: loanErrors },
    reset: resetLoan,
    control: loanControl,
  } = useForm({ resolver: yupResolver(PayLoanSchema) });

  const [payLoan] = usePayLoanMutation();

  // const formatToKes = (amount) => {
  //   return `KSh ${parseFloat(amount).toLocaleString("en-KE")}`;
  // };

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

  const handlePayLoan = async (data, event) => {
    event.preventDefault();
    try {
      data.loan = loanId;
      const response = await payLoan(data).unwrap();
      setTriggerFetch(true);
      resetLoan();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <GlassDialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          textAlign: "center",
          fontSize: "1rem",
          fontWeight: "bold",
        }}
      >
        {selectedRow ? `${toTitleCase(selectedRow?.lendee)}'s ${selectedRow?.principal_amount} Loan` : "Pay Loan"}
      </DialogTitle>
      <DialogContent>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          borderRadius="0.55rem"
          p="1rem"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <Box gridColumn="span 8" borderRadius="0.55rem">
            <Box
              gridTemplateColumns="repeat(12, 1fr)"
              display="grid"
              borderRadius="0.55rem"
              paddingRight={1}
              component="form"
              onSubmit={handleSubmitForMember(onSubmitHandler)}
              sx={{
                "& > div": {
                  gridColumn: isNonMediumScreens ? undefined : "span 12",
                },
              }}
            >
              <Box gridColumn="span 11" borderRadius="0.55rem" paddingRight={1}>
                <RHFAutoComplete
                  options={members?.results || []}
                  control={memberControl}
                  name="member"
                  placeholder="Choose a member to see their loans"
                  error={!!memberErrors?.member}
                  helperText={memberErrors.member?.message}
                  isFetch={isFetching}
                  multiple={false}
                />
              </Box>

              <Box gridColumn="span 1" borderRadius="0.55rem" paddingRight={1}>
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
                component="form"
                onSubmit={handleSubmitForLoan(handlePayLoan)}
                gridColumn="span 12"
                borderRadius="0.55rem"
                paddingRight={1}
              >
                {selectedRow ? (
                  <>
                    <Box display="flex" justifyContent="space-between">
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "1rem", mt: 2 }}
                        variant="h6"
                      >
                        Principal Amount
                        <br />
                        {formatToKes(selectedRow?.principal_amount)}
                      </Typography>

                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "1rem", mt: 2 }}
                        variant="h6"
                      >
                        Remaining Balance
                        <br />
                        {formatToKes(selectedRow?.remaining_balance)}
                      </Typography>
                    </Box>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="payment_amount"
                      label="Payment Amount"
                      type="text"
                      {...register("payment_amount")}
                      errors={loanErrors?.payment_amount}
                      helperText={loanErrors.payment_amount?.message}
                      fullWidth
                      sx={{ mt: 2 }}
                    />

                    <DateSelector
                      name="payment_date"
                      label="Payment Date"
                      control={loanControl}
                      errors={loanErrors?.payment_date}
                    />
                  </>
                ) : null}
              </Box>
            </Box>
          </Box>
          <Box gridColumn="span 4" gridRow="span 1" borderRadius="0.55rem">
            {memberId ? (
              <LoanDetailsTable
                loans={memberLoans?.results}
                onRowClick={handleRowClick}
                isLoading={isLoading}
              />
            ) : null}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmitForLoan(handlePayLoan)}
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            ml: 2,
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
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            mr: 2,
            p: 2,
            backgroundColor: theme.palette.secondary[500],
            color: "black",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: theme.palette.secondary[100],
            },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </GlassDialog>
  );
};

export default PayLoanModal;
