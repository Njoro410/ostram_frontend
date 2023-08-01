import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RHFAutoComplete from "../../../components/RHFAutoComplete";
import { checkStaffDetailsSchema } from "../../../utils/validationSchema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FlexBetween from "../../../components/FlexBetween";
import { useLazyGetStaffQuery } from "../../../services/authorization/authorizationSlices";

const EditStaff = ({ users, isFetch }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [getStaff, { isFetching }] = useLazyGetStaffQuery();
  const [staffId, setStaffId] = useState("");
  const [user, setUser] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [permGroups, setPermGroups] = useState([]);
  const [userPerms, setUserPerms] = useState([]);



  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(checkStaffDetailsSchema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    setStaffId(data.staff);
    setTriggerFetch(true);
  };

  useEffect(() => {
    if (triggerFetch) {
      getStaff(staffId).then((response) => {
        setUser(response?.data?.results);
      });
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  console.log(user);

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
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
        marginX={2}
        marginTop={2}
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmitHandler)}
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
          <Box gridColumn="span 11" borderRadius="0.55rem">
            <RHFAutoComplete
              options={users || []}
              control={control}
              name="staff"
              placeholder="Choose a staff to update their details"
              error={!!errors?.staff}
              helperText={errors.staff?.message}
              isFetch={isFetch}
              multiple={false}
            />
          </Box>

          <Box gridColumn="span 1">
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
      </Box>

      <Box gridColumn="span 12" gridRow="span 2" paddingX={2}>
        <FlexBetween>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={user?.username || ""}
            {...register("username")}
            error={errors?.username}
            helperText={errors.username?.message}
          />

          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={user?.email || ""}
            {...register("email")}
            error={errors?.email}
            helperText={errors.email?.message}
          />
        </FlexBetween>

        {/* <FlexBetween>
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
        </FlexBetween> */}
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
                defaultValue={user ? user.is_admin : false}
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
                defaultValue={user?.is_staff}
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
                defaultValue={user?.is_active}
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
                defaultValue={user?.is_superuser}
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
              isFetch={isFetch}
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
              isFetch={isFetch}
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
              isFetch={isFetch}
              multiple={true}
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

export default EditStaff;
