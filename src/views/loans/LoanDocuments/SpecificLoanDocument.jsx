import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import RHFAutoComplete from "../../../components/RHFAutoComplete";
import {
  useGetAllLoansQuery,
  useLazyGetLoanDocumentsQuery,
} from "../../../services/loans/loanSlices";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkLoanDocumentSchema } from "../../../utils/validationSchema";
import FlexBetween from "../../../components/FlexBetween";
import LoanDocumentCard from "../../../components/LoanComponents/LoanDocumentCard";

const SpecificLoanDocument = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: loans, isFetching } = useGetAllLoansQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(checkLoanDocumentSchema),
  });

  const [loanId, setLoanId] = useState("");
  const [documents, setDocuments] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const onSubmitHandler = (data,e) => {
    e.preventDefault()
    setLoanId(data.loan);
    setTriggerFetch(true);
  };

  const [getLoanDocuments] = useLazyGetLoanDocumentsQuery();

  useEffect(() => {
    if (triggerFetch) {
      getLoanDocuments(loanId).then((response) => {
        setDocuments(response.data);
      });
      setTriggerFetch(false);
    }
  }, [triggerFetch]);
  

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      borderRadius="0.55rem"
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      p="1rem"
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
      }}
    >
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        borderRadius="0.55rem"
        paddingRight={1}
      >
        <RHFAutoComplete
          options={loans?.results || []}
          control={control}
          name="loan"
          placeholder="Choose a loan"
          error={!!errors?.loan}
          helperText={errors.loan?.message}
          isFetch={isFetching}
          multiple={false}
        />
      </Box>
      <Box gridColumn="span 4" gridRow="span 2" borderRadius="0.55rem">
        <Button
          type="submit"
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "13px 20px",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#3c52b2",
            },
          }}
        >
          Submit
        </Button>
      </Box>
      {documents?.results.map((document) => (
        <Box
          key={document.id}
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          p={2}
          height="fit-content"
        >
          <LoanDocumentCard document={document} />
        </Box>
      ))}
    </Box>
  );
};

export default SpecificLoanDocument;
