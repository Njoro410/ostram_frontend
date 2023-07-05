import {
  Box,
  Button,
  useTheme,
  useMediaQuery,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import Header from "../../components/Header";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { loanApplicationSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  useGetLoanStatusQuery,
  useGetLoanTypesQuery,
  useCreateLoanMutation,
} from "../../services/loans/loanSlices";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { LoadingButton } from "@mui/lab";
import RHFAutoComplete from "../../components/RHFAutoComplete";
import DateSelector from "../../components/DateSelector";
import RHFSelect from "../../components/RHFSelect";
import toast, { Toaster } from "react-hot-toast";
const ApplyLoan = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();

  const { data: status } = useGetLoanStatusQuery();

  const { data: types } = useGetLoanTypesQuery();

  const { data: members, isFetching } = useGetMembersQuery();

  const [createLoan, { isLoading }] = useCreateLoanMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(loanApplicationSchema),
  });

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    try {
      const response = await createLoan(data).unwrap();
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
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="LOAN APPLICATION" subtitle="Apply loans " />
      <Toaster />
      <Box
        mt="20px"
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        display="grid"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          display="grid"
          gap="10px"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
          height="fit-content"
        >
          <Box mt={2}>
            <RHFAutoComplete
              options={members?.results || []}
              control={control}
              name="member"
              placeholder="Applicants Name"
              error={!!errors?.member}
              helperText={errors.member?.message}
              isFetch={isFetching}
              multiple={false}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="principal_amount"
              label="Principal Amount"
              name="principal_amount"
              autoComplete="names"
              autoFocus
              {...register("principal_amount")}
              error={!!errors?.principal_amount}
              helperText={errors.principal_amount?.message}
              sx={{
                mt: 2.5,
              }}
            />

            <RHFSelect
              name="loan_product"
              control={control}
              errors={errors?.loan_product}
              data={types?.results}
              label="Loan Product"
              mt={1}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="late_charge_percentage"
              label="Late charge perecentage"
              name="late_charge_percentage"
              autoComplete="names"
              autoFocus
              {...register("late_charge_percentage")}
              error={!!errors?.late_charge_percentage}
              helperText={errors.late_charge_percentage?.message}
              sx={{
                mt: 1.8,
              }}
            />
          </Box>

          <Box>
            <DateSelector
              name="application_date"
              label="Application Date"
              control={control}
              errors={errors?.application_date}
            />

            <DateSelector
              name="start_date"
              label="Start Date"
              control={control}
              errors={errors?.start_date}
            />

            <RHFSelect
              name="status"
              control={control}
              errors={errors?.status}
              data={status?.results}
              label="Status"
              mt={1.9}
            />

            <Controller
              name="payment_frequency"
              control={control}
              defaultValue="monthly"
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors?.payment_frequency}
                  sx={{
                    mt: 2,
                  }}
                >
                  <InputLabel>Payment Frequency</InputLabel>
                  <Select
                    value={value}
                    onChange={onChange}
                    label="Payment Frequency"
                  >
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.payment_frequency?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Box>

          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="grace_period"
              label="Grace Period In Days"
              name="grace_period"
              autoComplete="grace_period"
              autoFocus
              error={errors?.grace_period}
              helperText={errors.grace_period?.message}
              {...register("grace_period")}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="term"
              label="Loan Term In Months"
              name="term"
              autoComplete="term"
              autoFocus
              error={errors?.term}
              helperText={errors.term?.message}
              {...register("term")}
              sx={{
                mt: 1,
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              id="reason"
              label="Reason for application"
              name="reason"
              autoFocus
              multiline
              maxRows={errors?.reason ? 5.5 : 4.6}
              minRows={errors?.reason ? 5.5 : 4.6}
              error={errors?.reason}
              helperText={errors.reason?.message}
              {...register("reason")}
              sx={{
                mt: 1.2,
              }}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          mt={0}
          borderRadius="0.55rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="20rem"
        >
          <RHFAutoComplete
            options={members?.results || []}
            control={control}
            name="guarantors"
            placeholder="Guarantors Name"
            error={!!errors?.guarantors}
            helperText={errors.guarantors?.message}
            isFetch={isFetching}
            multiple={true}
          />
          <Button
            type="submit"
            fullWidth
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
            Submit
          </Button>
        </Box>

        <Box gridColumn="span 8">
          {/* {!isLoading ? ( */}
          {/* <Button
            type="submit"
            fullWidth
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
            Submit
          </Button> */}
          {/* ) : ( */}
          {/* <LoadingButton
              loading
              fullWidth
              variant="contained"
              sx={{ p: 4, mt: 5 }}
            >
              <span>Submit</span>
            </LoadingButton> */}
          {/* )} */}
        </Box>
      </Box>
    </Box>
  );
};

export default ApplyLoan;
