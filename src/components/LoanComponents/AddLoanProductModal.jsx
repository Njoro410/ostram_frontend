import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  useGetLoanDocumentsTypesQuery,
  useCreateLoanProductMutation,
} from "../../services/loans/loanSlices";
import RHFAutoComplete from "../RHFAutoComplete";
import { yupResolver } from "@hookform/resolvers/yup";
import { loanProductSchema } from "../../utils/validationSchema";
import { Controller, useForm } from "react-hook-form";
import { GlassDialog } from "../GlassDialog";

const AddLoanProductModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: document_types, isFetching } = useGetLoanDocumentsTypesQuery();
  const [createLoanProduct, { isLoading }] = useCreateLoanProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(loanProductSchema),
  });

  const onSubmitHandler = async (data, event) => {
    event.preventDefault();
    try {
      const response = await createLoanProduct(data).unwrap();
      // console.log(response)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GlassDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
    >
      <DialogTitle>Add Loan Product</DialogTitle>
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
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              {...register("name")}
              error={errors.name ? true : false}
              helperText={errors.name?.message}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              multiline
              rows={errors.description?.message ? 5.3 : 4.2}
              type="text"
              fullWidth
              {...register("description")}
              error={errors.description ? true : false}
              helperText={errors.description?.message}
            />
          </Box>
          <Box gridColumn="span 4" gridRow="span 1">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Annual Rate"
              type="text"
              fullWidth
              {...register("interest_rate")}
              error={errors.interest_rate ? true : false}
              helperText={errors.interest_rate?.message}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Minimum Amount"
              type="text"
              fullWidth
              {...register("min_amount")}
              error={errors.min_amount ? true : false}
              helperText={errors.min_amount?.message}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Maximum Amount"
              type="text"
              fullWidth
              {...register("max_amount")}
              error={errors.max_amount ? true : false}
              helperText={errors.max_amount?.message}
            />
          </Box>
          <Box gridColumn="span 4" gridRow="span 1">
            <RHFAutoComplete
              options={document_types?.results || []}
              control={control}
              name="documents"
              placeholder="Select Documents"
              error={!!errors?.documents}
              helperText={errors.documents?.message}
              isFetch={isFetching}
              multiple={true}
            />

            <Controller
              name="interest_type"
              control={control}
              defaultValue="Simple"
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
                  <InputLabel>Interest Type</InputLabel>
                  <Select
                    value={value}
                    onChange={onChange}
                    label="Interest Type"
                  >
                    <MenuItem value="Simple">Simple</MenuItem>
                    <MenuItem value="Compounding">Compounding</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.payment_frequency?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <FormGroup sx={{ display: "flex" }}>
              <Controller
                name="need_guarantor"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Needs Guarantors"
                  />
                )}
              />

              <Controller
                name="need_collateral"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Needs Collateral"
                  />
                )}
              />
            </FormGroup>
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
    </GlassDialog>
  );
};

export default AddLoanProductModal;
