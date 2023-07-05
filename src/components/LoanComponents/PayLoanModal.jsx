import React from "react";
import { useForm } from "react-hook-form";
import {
  useGetAllLoansQuery,
  usePayLoanMutation,
} from "../../services/loans/loanSlices";
import { PayLoanSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import DateSelector from "../DateSelector";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, useTheme } from "@mui/material";
import RHFAutoComplete from "../RHFAutoComplete";
import toast, { Toaster } from "react-hot-toast";

const PayLoanModal = ({ open, onClose }) => {
  const theme = useTheme()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(PayLoanSchema),
  });

  const [payLoan, { isLoading }] = usePayLoanMutation();
  const { data: loans, isFetching } = useGetAllLoansQuery();

  const onSubmitHandler = async (data, event) => {
    event.preventDefault();

    try {
      const response = await payLoan(data).unwrap();
      toast.success(response.message, {
        duration: 5000,
        position: "top-right",

        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#00ff1a",
          secondary: "#fff",
        },

        // Aria
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      reset()
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <Toaster/>
      <DialogTitle>Pay Loan</DialogTitle>
      <DialogContent>
        {" "}
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
          <RHFAutoComplete
            options={loans?.results || []}
            control={control}
            name="loan"
            placeholder="Select Loan"
            error={!!errors?.loan}
            helperText={errors.loan?.message}
            isFetch={isFetching}
          />
          <TextField
            autoFocus
            margin="dense"
            id="payment_amount"
            label="Payment Amount"
            type="text"
            {...register("payment_amount")}
            error={errors.payment_amount ? true : false}
            helperText={errors.payment_amount?.message}
            fullWidth
          />
            <DateSelector
              name="payment_date"
              label="Payment Date"
              control={control}
              errors={errors?.payment_date}
            />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary.light}
            gutterBottom
            variant="button"
            display="block"
          >
            Cancel
          </Typography>
        </Button>
        <Button onClick={handleSubmit(onSubmitHandler)}>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary.light}
            gutterBottom
            variant="button"
            display="block"
          >
            Submit
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PayLoanModal;
