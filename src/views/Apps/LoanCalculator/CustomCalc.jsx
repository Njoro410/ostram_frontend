import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { customCalcSchema } from "../../../utils/validationSchema";
import calculateFixedLoanPayments from "../../../utils/fixedLoanCalculator";

const CustomCalc = ({ updateLoanData }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(customCalcSchema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    const response = calculateFixedLoanPayments(
      data.amount,
      data.term,
      data.rate
    );
    updateLoanData(response);
  };

  return (
    <Box
      mt="20px"
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        color: theme.palette.secondary[300],
      }}
    >
    <Box
      gridColumn="span 12"
      // gridRow="span 2"
      px="1.25rem"
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      autoComplete="off"
      sx={{ color: theme.palette.secondary[300] }}
    >
      <Typography
        variant="h4"
        display="block"
        sx={{
          textAlign: "center",
          fontWeight: "bolder",
          textTransform: "uppercase",
        }}
      >
        Fixed term calculator
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="amount"
        label="Loan Amount"
        {...register("amount")}
        error={!!errors?.amount}
        helperText={errors.amount?.message}
        sx={{
          mb: -0.5,
        }}
      />

      <TextField
        margin="normal"
        fullWidth
        id="term"
        label="Loan term in months"
        {...register("term")}
        error={!!errors?.term}
        helperText={errors.term?.message}
        sx={{
          mb: -0.5,
        }}
      />

      <TextField
        margin="normal"
        fullWidth
        id="rate"
        label="Annual interest rate"
        {...register("rate")}
        error={!!errors?.rate}
        helperText={errors.rate?.message}
        sx={{
          mb: -0.5,
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          p: 2,
          mt: 2,
          mb:4.5,
          backgroundColor: theme.palette.secondary[500],
          color: "black",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: theme.palette.secondary[100],
          },
        }}
      >
        Calculate
      </Button>
    </Box>
    </Box>
  );
};

export default CustomCalc;
