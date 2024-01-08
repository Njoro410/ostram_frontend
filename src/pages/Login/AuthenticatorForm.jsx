import { LoadingButton } from "@mui/lab";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { authenticatorValidationSchema } from "../../utils/validationSchema";
import { notifications } from "@mantine/notifications";
import { useVerify2FAMutation } from "../../services/authorization/authorizationSlices";
import { useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

const AuthenticatorForm = ({ onBackClick }) => {
  const theme = useTheme();
  const [verify2FA, { isLoading }] = useVerify2FAMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(authenticatorValidationSchema),
  });

  const {
    user,
    isLoading: userIsLoading,
    isSuccess,
    isError,
    error,
  } = useUser();

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    try {
      const response = await verify2FA({ data }).unwrap();

      if (response.otp_verified) {
        navigate("/dashboard");
      }
    } catch (err) {
      notifications.show({
        id: "load-data",
        color: "red",
        title: err?.data?.status,
        message: err?.data?.message,
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
      component="form"
      onSubmit={handleSubmit(onSubmitHandler)}
      noValidate
      sx={{
        mt: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        p: 3,
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{
          fontWeight: "light",
          fontSize: "1.1rem",
          textAlign: "center",
          color: theme.palette.secondary[300],
        }}
      >
        Hello {user?.results.full_name} Enter The Six Digit Authenticator Code
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Authenticator Code"
        autoFocus
        {...register("otp")}
        error={errors.otp ? true : false}
        helperText={errors.otp?.message}
      />

      {!isLoading ? (
        <Box display="flex" gap={1}>
          <Button
            type="submit"
            {...(errors.email || errors.password ? { disabled: true } : {})}
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              p: 2,
              backgroundColor: theme.palette.secondary[500],
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.palette.secondary[100],
              },
            }}
          >
            Verify
          </Button>

          <Button
            variant="contained"
            onClick={onBackClick}
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: theme.palette.secondary[500],
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.palette.secondary[100],
              },
            }}
          >
            Back
          </Button>
        </Box>
      ) : (
        <LoadingButton loading fullWidth variant="contained">
          <span>Submit</span>
        </LoadingButton>
      )}
    </Box>
  );
};

export default AuthenticatorForm;
