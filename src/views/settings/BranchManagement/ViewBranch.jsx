import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import RHFSelect from "../../../components/RHFSelect";
import { useGetAllBranchesQuery, useLazyGetSpecificBranchQuery } from "../../../services/administration/administrationSlices";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkBranchDetailsSchema } from "../../../utils/validationSchema";

const ViewBranch = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [branchId, setBranchId] = useState( );
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [branch, setBranch] = useState([]);
  const { data: branches } = useGetAllBranchesQuery();

  const [getSpecificBranch, { isFetching }] = useLazyGetSpecificBranchQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({resolver: yupResolver(checkBranchDetailsSchema)});

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    setBranchId(data.branch);
    setTriggerFetch(true);
  };

  useEffect(() => {
    if (triggerFetch) {
      getSpecificBranch(branchId).then((response) => { 
        setBranch(response.data);
      });
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  


  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      gap="10px"
      sx={{
        "& > div": {
          gridColumn: isNonMediumScreens ? undefined : "span 12",
        },
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Box
        gridColumn="span 11"
        height="fit-content"
        borderRadius="0.55rem"
        marginX={2}
        marginY={0.8}
      >
        <RHFSelect
          name="branch"
          control={control}
          errors={errors?.branch}
          data={branches?.results}
          label="Select a branch"
        />
      </Box>
      <Box
        gridColumn="span 1"
        borderRadius="0.55rem"
        height="fit-content"
        marginX={2}
        marginTop={0.8}
      >
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
      
    </Box>
  );
};

export default ViewBranch;
