import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { addBranchSchema } from "../../../utils/validationSchema";
import FlexBetween from "../../../components/FlexBetween";
import RHFSelect from "../../../components/RHFSelect";
import { useGetResidentialQuery } from "../../../services/members/memberSlices";
import RHFAutoComplete from "../../../components/RHFAutoComplete";
import { useCreateBranchMutation, useGetBranchStatusQuery } from "../../../services/administration/administrationSlices";
import { notifications } from "@mantine/notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const CreateBranch = ({ staff, isFetching }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: areas } = useGetResidentialQuery();
  const { data: branch_status } = useGetBranchStatusQuery();
  const [createBranch, { isLoading }] = useCreateBranchMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(addBranchSchema),
  });


  const onSubmitHandler = async (data, e) => {
    e.preventDefault()
    try {
      notifications.show({
        id: "load-data",
        loading: true,
        title: "Loading...",
        message: "Please wait as the request is being processed",
        autoClose: false,
        withCloseButton: true,
        styles: () => ({
          root: {
            backgroundColor: "whitesmoke",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "black",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "black",
            fontWeight: "normal",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "black",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });

      const response = await createBranch(data).unwrap();

      notifications.update({
        id: "load-data",
        color: "green",
        title: "Success",
        message: response.message,
        autoClose: 8000,
        icon: (
          <CheckCircleIcon
            sx={{ backgroundSize: "1rem", backgroundColor: "#02d054" }}
          />
        ),
        styles: () => ({
          root: {
            backgroundColor: "#02d054",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });

      reset();
    } catch (err) {
      // console.log(err);

      notifications.update({
        id: "load-data",
        color: "red",
        title: err?.data?.message,
        message: err?.data?.results?.email,
        autoClose: 8000,
        icon: <CancelIcon sx={{ backgroundSize: "1rem" }} />,
        styles: () => ({
          root: {
            backgroundColor: "#f94c18",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });
    }
  }


  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      autoComplete="off"
      backgroundColor={theme.palette.background.alt}
      height="fit-content"
      sx={{
        "& > div": {
          gridColumn: isNonMediumScreens ? undefined : "span 12",
        },
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Box gridColumn="span 12" gridRow="span 2" paddingX={2}>
        <FlexBetween>
          <TextField
            margin="normal"
            fullWidth
            id="full_address"
            label="Full Address"
            name="full_address"
            {...register("full_address")}
            error={errors?.full_address}
            helperText={errors.full_address?.message}
          />

          <RHFSelect
            name="location"
            control={control}
            errors={errors?.location}
            data={areas?.results}
            label="Location"
            mt={1.5}
          />
        </FlexBetween>

        <FlexBetween>
          <TextField
            margin="normal"
            fullWidth
            id="phone"
            label="Branch Phone Number"
            name="phone"
            {...register("phone")}
            error={errors?.phone}
            helperText={errors.phone?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Branch Email Address"
            name="email"
            {...register("email")}
            error={errors?.email}
            helperText={errors.email?.message}
          />
        </FlexBetween>
      </Box>
      <Box
        gridColumn="span 12"
        gridRow="span 1"
        marginX={2}
        marginBottom={2}
        backgroundColor={theme.palette.background.alt}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gap="10px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
            mt:1.5
          }}
        >
          <Box gridColumn="span 6" gridRow="span 1">
            <RHFAutoComplete
              options={staff || []}
              control={control}
              name="manager"
              placeholder="Manager"
              error={errors?.manager}
              helperText={errors.manager?.message}
              isFetch={isFetching}
              multiple={false}
            />
          </Box>
          <Box gridColumn="span 6" gridRow="span 1">
            <RHFSelect
              name="status"
              control={control}
              errors={errors?.status}
              data={branch_status?.results}
              label="Branch Status"
      
            />
          </Box>
        </Box>
      </Box>

      <Box gridColumn="span 12" gridRow="span 1" paddingX={2}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            p: 2,
            mb: 2.5,
            mt: 2.5,
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
      </Box>
    </Box>
  );
};

export default CreateBranch;
