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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import {
  useGetLoanStatusQuery,
  useGetLoanTypesQuery,
} from "../../services/loans/loanSlices";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import { LoadingButton } from "@mui/lab";
import RHFAutoComplete from "../../components/RHFAutoComplete";
import moment from "moment";
import DateSelector from "../../components/DateSelector";
import RHFSelect from "../../components/RHFSelect";

const ApplyLoan = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();

  const { data: status } = useGetLoanStatusQuery();

  const { data: types } = useGetLoanTypesQuery();
 

  const { data: members, isFetching } = useGetMembersQuery({ skip: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(loanApplicationSchema),
  });

  const onSubmitHandler = (data) => {
    console.log(data);
    console.log(moment());
  };

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="LOAN APPLICATION" subtitle="Apply loans " />

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
        >
          <Box mt={2}>
            <RHFAutoComplete
              options={members?.results || []}
              control={control}
              name="applicant"
              placeholder="Applicants Name"
              error={!!errors?.applicant}
              helperText={errors.applicant?.message}
              isFetch={isFetching}
              multiple={false}
            />

            <RHFSelect
              name="loan_type"
              control={control}
              errors={errors?.loan_type}
              data={types?.results}
              label="Loan Type"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Amount"
              name="names"
              autoComplete="names"
              autoFocus
              {...register("amount")}
              error={errors.amount ? true : false}
              helperText={errors.amount?.message}
              sx={{
                mt: 3,
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

            <RHFSelect
              name="status"
              control={control}
              errors={errors?.status}
              data={status?.results}
              label="Status"
            />

            <TextField
              margin="normal"
              fullWidth
              id="names"
              label="Reason for application"
              name="names"
              autoComplete="names"
              autoFocus
              {...register("loan_reason")}
              sx={{
                mt: 3,
              }}
            />
          </Box>

          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="grace_period"
              label="Grace period"
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
              id="tenure_period"
              label="Tenure period"
              name="tenure_period"
              autoComplete="tenure_period"
              autoFocus
              error={errors?.tenure_period}
              helperText={errors.tenure_period?.message}
              {...register("tenure_period")}
              sx={{
                mt: 2,
              }}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
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
        </Box>

        <Box gridColumn="span 8">
          {/* {!isLoading ? ( */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 5,
              p: 4,
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
