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
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { loanApplicationSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const ApplyLoan = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(loanApplicationSchema),
  });

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="LOAN APPLICATION" subtitle="Apply loans " />

      <Box
        mt="20px"
        component="form"
        // onSubmit={handleSubmit(onSubmitHandler)}
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
            <Controller
              name="applicant"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors?.applicant}
                >
                  <InputLabel>Applicant</InputLabel>
                  <Select value={value} onChange={onChange} label="Applicant">
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                  </Select>
                  <FormHelperText>{errors.applicant?.message}</FormHelperText>
                </FormControl>
              )}
            />

            <Controller
              name="loan_type"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors?.loan_type}
                  sx={{
                    mt: 3,
                  }}
                >
                  <InputLabel>Loan Type</InputLabel>
                  <Select value={value} onChange={onChange} label="Loan Type">
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                  </Select>
                  <FormHelperText>{errors.loan_type?.message}</FormHelperText>
                </FormControl>
              )}
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Application Date"
              name="names"
              autoComplete="names"
              autoFocus
            />

            <Controller
              name="status"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <FormControl
                  variant="outlined"
                  fullWidth
                  required
                  error={!!errors?.applicant}
                >
                  <InputLabel>Status</InputLabel>
                  <Select value={value} onChange={onChange} label="Status">
                    <MenuItem value="1">Submitted</MenuItem>
                  </Select>
                  <FormHelperText>{errors.applicant?.message}</FormHelperText>
                </FormControl>
              )}
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
            />
          </Box>

          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Grace period"
              name="names"
              autoComplete="names"
              autoFocus
              {...register("grace_period")}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Tenure period"
              name="names"
              autoComplete="names"
              autoFocus
              {...register("tenure_period")}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Guarantors"
              name="names"
              autoComplete="names"
              autoFocus
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        ></Box>
      </Box>
    </Box>
  );
};

export default ApplyLoan;
