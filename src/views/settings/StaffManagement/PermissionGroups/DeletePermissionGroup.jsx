import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDeletePermissionGroupMutation, useGetAllPermGroupsQuery } from "../../../../services/authorization/authorizationSlices";
import { notifications } from "@mantine/notifications";
import { getPermissionGroupSchema } from "../../../../utils/validationSchema";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RHFSelect from "../../../../components/RHFSelect";

const DeletePermissionGroup = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { data: permGroups, isFetching } = useGetAllPermGroupsQuery();
  const [deletePermissionGroup, { isLoading }] = useDeletePermissionGroupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(getPermissionGroupSchema),
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

      const response = await deletePermissionGroup(data).unwrap();

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
        <RHFSelect
          name="group"
          control={control}
          errors={errors?.group}
          data={permGroups?.results || []}
          label="Permission Group"
          mt={1}
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
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeletePermissionGroup;
