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
  useCreateLoanDocumentMutation
} from "../../services/loans/loanSlices";
import { AddLoanDocumentSchema } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import RHFSelect from "../RHFSelect";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*,application/pdf",
    onDrop: (acceptedFiles) => {
      // Do something with the accepted files, for example call a callback function
      onDrop(acceptedFiles[0]);
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Box p={2} height="10.5rem" border="dashed" bgcolor="gray">
        <Typography>
          Drag and drop a file here, or click to select a file
        </Typography>
      </Box>
    </div>
  );
};

const AddLoanDocumentModal = ({ open, onClose }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [file, setFile] = useState(null);

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
      const formData = new FormData();
      formData.append('loan', data.loan);
      formData.append('document_type', data.document_type);
      formData.append('status', data.status);
      formData.append('file', file);
      console.log({...formData});

  
      const response = await createLoanDocument(formData).unwrap();
      // Handle the response
      console.log(response);
    } catch (err) {
      // Handle the error
      console.log(err);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Add Loan Document</DialogTitle>
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
          <Box gridColumn="span 6" gridRow="span 1">
            <RHFAutoComplete
              options={loans?.results || []}
              control={control}
              name="loan"
              placeholder="Select Loan"
              error={!!errors?.loan}
              helperText={errors.loan?.message}
              isFetch={isFetching}
            />

            <RHFSelect
              name="document_type"
              control={control}
              errors={errors?.document_type}
              data={document_types?.results}
              label="Document Type"
              mt={1}
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
          <Box gridColumn="span 6" gridRow="span 1">
            <MyDropzone onDrop={setFile} />
            {file && <Typography>Selected file: {file.name}</Typography>}
            <input
              type="hidden"
              {...register("file")}
              value={file ? file.name : ""}
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

export default AddLoanDocumentModal;
