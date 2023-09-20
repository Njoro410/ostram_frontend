import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RHFAutoComplete from "../../../../components/RHFAutoComplete";
import { useCreatePermissionGroupMutation, useGetAllPermsQuery } from "../../../../services/authorization/authorizationSlices";
import { notifications } from "@mantine/notifications";
import { addPermissionGroupSchema } from "../../../../utils/validationSchema";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const CreatePermissionGroups = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [userPerms, setUserPerms] = useState([]);

  const { data: permissions, isFetching } = useGetAllPermsQuery();

  const [createPermissionGroup, { isLoading }] = useCreatePermissionGroupMutation();

  useEffect(() => {
    if (permissions) {
      setUserPerms(permissions.results);
    }
  }, [permissions]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(addPermissionGroupSchema),
  });

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
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

      const response = await createPermissionGroup(data).unwrap();
     

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

      notifications.update({
        id: "load-data",
        color: "red",
        title: err?.data?.message,
        message: err?.data?.errors?.name,
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
  };



  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      backgroundColor={theme.palette.background.alt}
      sx={{
        "& > div": {
          gridColumn: isNonMediumScreens ? undefined : "span 12",
        },
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        mt: 2,
      }}
    >
      <Box
        gridColumn="span 12"
        borderRadius="0.55rem"
        height="fit-content"
        marginX={2}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Group Name"
          name="name"
          {...register("name")}
          error={errors?.name}
          helperText={errors.name?.message}
        />

        <RHFAutoComplete
          options={userPerms || []}
          control={control}
          name="permissions"
          placeholder="Group permissions"
          error={errors?.permissions}
          helperText={errors.permissions?.message}
          isFetch={isFetching}
          multiple={true}
        />
        
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
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePermissionGroups;
