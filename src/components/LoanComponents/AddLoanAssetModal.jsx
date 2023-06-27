import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import RHFAutoComplete from "../RHFAutoComplete";
import {
  useGetAllLoansQuery,
  useGetDocumentStatusQuery,
  useGetLoanDocumentsTypesQuery,
  useCreateLoanDocumentMutation,
} from "../../services/loans/loanSlices";
import { AddLoanDocumentSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RHFSelect from "../RHFSelect";
import DateSelector from "../DateSelector";

const AddLoanAssetModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: loans, isFetching } = useGetAllLoansQuery();
  const { data: document_types } = useGetLoanDocumentsTypesQuery();
  const { data: document_status } = useGetDocumentStatusQuery();
  const [createLoanDocument, { isLoading }] = useCreateLoanDocumentMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(AddLoanDocumentSchema),
  });

  const onSubmitHandler = async (data, event) => {
    event.preventDefault();

    try {
      const response = await createLoanDocument(data).unwrap();
      // Handle the response
      console.log(response);
    } catch (err) {
      // Handle the error
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Add Loan Asset</DialogTitle>
      <DialogContent>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="260px"
          borderRadius="0.55rem"
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          p="1rem"
          gap="20px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <Box gridColumn="span 4" gridRow="span 1">
            <TextField
              margin="normal"
              required
              fullWidth
              id="late_charge_percentage"
              label="Asset Name"
              name="late_charge_percentage"
              autoComplete="names"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="late_charge_percentage"
              label="Asset Value"
              name="late_charge_percentage"
              autoComplete="names"
              autoFocus
            />
            <RHFAutoComplete
              options={loans?.results || []}
              control={control}
              name="loan"
              placeholder="Select Loan"
              error={!!errors?.loan}
              helperText={errors.loan?.message}
              isFetch={isFetching}
            />
          </Box>
          <Box gridColumn="span 4" gridRow="span 1">
            <DateSelector
              name="application_date"
              label="Inspection Date"
              control={control}
              errors={errors?.application_date}
            />

            <DateSelector
              name="application_date"
              label="Expiry Date"
              control={control}
              errors={errors?.application_date}
            />

            <RHFSelect
              name="status"
              control={control}
              errors={errors?.status}
              data={document_status?.results}
              label="Document Status"
              mt={1}
            />
          </Box>
          <Box gridColumn="span 4" gridRow="span 1">
            <TextField
              margin="normal"
              required
              fullWidth
              id="late_charge_percentage"
              label="Description"
              name="late_charge_percentage"
              autoComplete="names"
              autoFocus
              multiline
              minRows={7.5}
              maxRows={7.5}
            />
          </Box>
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

export default AddLoanAssetModal;
