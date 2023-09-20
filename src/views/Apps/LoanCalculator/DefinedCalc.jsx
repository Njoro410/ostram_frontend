import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { definedCalcSchema } from "../../../utils/validationSchema";
import calculateFixedLoanPayments from "../../../utils/fixedLoanCalculator";
import { useGetLoanTypesQuery } from "../../../services/loans/loanSlices";
import calculateCompoundingLoanPayments from "../../../utils/compoundingLoanCalculator";

const DefinedCalc = ({ updateLoanData }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: types } = useGetLoanTypesQuery();
  const [selectedInterestRate, setSelectedInterestRate] = useState(null);
  const [selectedInterestType, setSelectedInterestType] = useState(null);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(definedCalcSchema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    if (selectedInterestType === "Simple") {
      const response = calculateFixedLoanPayments(
        data.amount,
        data.term,
        selectedInterestRate
      );
      updateLoanData(response);
    } else if (selectedInterestType === "Compounding") {
      const response = calculateFixedLoanPayments(
        data.amount,
        data.term,
        selectedInterestRate
      );
      updateLoanData(response);
    }
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
        noValidate
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
          Based On Loan Product
        </Typography>

        <Controller
          name="loan_product"
          control={control}
          defaultValue=""
          noValidate
          render={({ field: { onChange, value } }) => (
            <FormControl
              variant="outlined"
              fullWidth
              required
              error={errors?.loan_product}
              sx={{
                mt: 2,
                mb: -1,
              }}
            >
              <InputLabel>Loan Product</InputLabel>
              <Select
                value={value}
                onChange={(e) => {
                  const selectedItemId = e.target.value;
                  const selectedType = types.results.find(
                    (item) => item.id === selectedItemId
                  );

                  if (selectedType) {
                    setSelectedInterestRate(selectedType.interest_rate);
                    setSelectedInterestType(selectedType.interest_type);
                  } else {
                    setSelectedInterestRate(null);
                    setSelectedInterestType(null);
                  }

                  onChange(e);
                }}
                label="Loan Product"
              >
                {types?.results?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.loan_product?.message}</FormHelperText>
            </FormControl>
          )}
        />

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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            p: 2,
            mt: 2,
            mb: 4.5,
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

export default DefinedCalc;
