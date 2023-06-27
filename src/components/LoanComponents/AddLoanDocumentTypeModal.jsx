import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loanDocumentTypeSchema } from "../../utils/validationSchema";
import { useCreateLoanDocumentTypeMutation } from "../../services/loans/loanSlices";

const AddLoanDocumentTypeModal = ({ open, onClose }) => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(loanDocumentTypeSchema),
  });

  const [createLoanDocumentType, { isLoading }] = useCreateLoanDocumentTypeMutation();

  const onSubmitHandler = async (data, event) => {
    event.preventDefault();
    console.log(data);
    try {
      const response = await createLoanDocumentType(data).unwrap();
      // console.log(response)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Add Loan Product</DialogTitle>
      <DialogContent> 
        {" "}
        <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
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
            maxRows={5}
            minRows={5}
            type="text"
            {...register("description")}
            error={errors.description ? true : false}
            helperText={errors.description?.message}
            fullWidth
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

export default AddLoanDocumentTypeModal;
