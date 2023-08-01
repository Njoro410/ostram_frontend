import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../../components/FlexBetween";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addStaffSchema } from "../../../utils/validationSchema";
import {
  useGetAllPermGroupsQuery,
  useGetAllPermsQuery,
  useRegisterStaffMutation,
} from "../../../services/authorization/authorizationSlices";
import { notifications } from "@mantine/notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import RHFAutoComplete from "../../../components/RHFAutoComplete";
import TransferList from "../../../components/TransferList";

const AddStaff = ({ users, isFetching }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [permGroups, setPermGroups] = useState([]);
  const [userPerms, setUserPerms] = useState([]);
  

  const [registerStaff, { isLoading }] = useRegisterStaffMutation();

  const { data: groups } = useGetAllPermGroupsQuery();
  const { data: permissions } = useGetAllPermsQuery();

  useEffect(() => {
    if (groups && permissions) {
      setPermGroups(groups.results);
      setUserPerms(permissions.results);
    }
  }, [groups, permissions]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(addStaffSchema),
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

      const response = await registerStaff(data).unwrap();

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
        title: "Error",
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
      <Box gridColumn="span 12" gridRow="span 2" paddingX={2}>
        <FlexBetween>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            {...register("username")}
            error={errors?.username}
            helperText={errors.username?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            {...register("email")}
            error={errors?.email}
            helperText={errors.email?.message}
          />
        </FlexBetween>

        <FlexBetween>
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            {...register("password")}
            error={errors?.password}
            helperText={errors.password?.message}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password2"
            label="Confirm Password"
            name="password2"
            {...register("password2")}
            error={errors?.password2}
            helperText={errors.password2?.message}
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
          }}
        >
          <Box gridColumn="span 8" gridRow="span 1">
            <FlexBetween
              sx={{
                border: (theme) => `2.2px solid ${theme.palette.divider}`,
                borderRadius: 1,
                paddingX: 2,
                paddingY: 0.7,
              }}
            >
              <Controller
                name="is_admin"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          "&.Mui-checked": {
                            color: theme.palette.secondary[500],
                          },
                        }}
                      />
                    }
                    label="Admin"
                  />
                )}
              />

              <Controller
                name="is_staff"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          "&.Mui-checked": {
                            color: theme.palette.secondary[500],
                          },
                        }}
                      />
                    }
                    label="Staff"
                  />
                )}
              />

              <Controller
                name="is_active"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          "&.Mui-checked": {
                            color: theme.palette.secondary[500],
                          },
                        }}
                      />
                    }
                    label="Active"
                  />
                )}
              />

              <Controller
                name="is_superuser"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          "&.Mui-checked": {
                            color: theme.palette.secondary[500],
                          },
                        }}
                      />
                    }
                    label="Superuser"
                  />
                )}
              />
            </FlexBetween>
          </Box>
          <Box gridColumn="span 4" gridRow="span 1">
            <RHFAutoComplete
              options={users || []}
              control={control}
              name="reports_to"
              placeholder="Reports To"
              error={errors?.reports_to}
              helperText={errors.reports_to?.message}
              isFetch={isFetching}
              multiple={false}
            />
          </Box>
        </Box>
      </Box>
      <Box
        gridColumn="span 12"
        gridRow="span 1"
        marginX={2}
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
          }}
        >
          <Box
            gridColumn="span 6"
            gridRow="span 1"
            backgroundColor={theme.palette.background.alt}
          >
            <RHFAutoComplete
              options={permGroups || []}
              control={control}
              name="groups"
              placeholder="Permission Groups"
              error={errors?.groups}
              helperText={errors.groups?.message}
              isFetch={isFetching}
              multiple={true}
            />
          </Box>
          <Box
            gridColumn="span 6"
            gridRow="span 1"
            backgroundColor={theme.palette.background.alt}
          >
            <RHFAutoComplete
              options={userPerms || []}
              control={control}
              name="permissions"
              placeholder="User specific permissions"
              error={errors?.permissions}
              helperText={errors.permissions?.message}
              isFetch={isFetching}
              multiple={true}
            />
          </Box>
        </Box>
      </Box>
      {/* <Box
        gridColumn="span 12"
        gridRow="span 4"
        paddingX={2}
        sx={{
          ...(errors?.username ||
          errors?.email ||
          errors?.password1 ||
          errors?.password2 ||
          errors?.reports_to
            ? { mt: 6 }
            : {}),
        }}
      >
        <TransferList />
      </Box> */}
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

export default AddStaff;
