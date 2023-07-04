import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../utils/validationSchema";
import Copyright from "../components/Copyright";
import {
  useTheme,
  Button,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";
import Logo from "../assets/ostlogo.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCSRFToken,
  setAccessToken,
  setRefreshToken,
  setUserId,
} from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import toast, { Toaster } from "react-hot-toast";
import LoadingButton from "@mui/lab/LoadingButton";
import jwt_decode from "jwt-decode";

export default function SignIn() {
  const theme = useTheme();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
  });

  const onSubmitHandler = async (data, e) => {
    e.preventDefault();
    try {
      const userData = await login(data).unwrap();
      dispatch(setAccessToken(userData.data.accessToken));
      dispatch(setRefreshToken(userData.data.refreshToken));
      dispatch(setCSRFToken(userData.token));
      var token = userData.data.accessToken;
      var decoded = jwt_decode(token);
      dispatch(setUserId(decoded.user_id));

      reset();
      navigate("/dashboard");
    } catch (err) {
      if (err.status === 400) {
        toast.error(err.data.message, {
          duration: 8000,
          position: "top-right",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#f70707",
            secondary: "#fff",
          },

          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      } else {
        toast.error("No server response", {
          duration: 8000,
          position: "top-right",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#f70707",
            secondary: "#fff",
          },

          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "7rem",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Ostram Logo"
          src={Logo}
        />

        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Staff Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={errors.email ? true : false}
            helperText={errors.email?.message}
            defaultValue="admin1@test.com"
            sx={{
              "& label": {
                color: theme.palette.secondary[500],
                "&.Mui-focused": {
                  color: theme.palette.secondary[500],
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.secondary[500],
                },
                "&:hover fieldset": {
                  borderColor: "green",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            defaultValue="123456"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
            sx={{
              "& label": {
                color: theme.palette.secondary[500],
                "&.Mui-focused": {
                  color: theme.palette.secondary[500],
                },
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.secondary[500],
                },
                "&:hover fieldset": {
                  borderColor: "green",
                },
              },
            }}
          />
          {!isLoading ? (
            <Button
              type="submit"
              {...(errors.email || errors.password ? { disabled: true } : {})}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: theme.palette.secondary[500],
                color: "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: theme.palette.secondary[100],
                },
              }}
            >
              Sign In
            </Button>
          ) : (
            <LoadingButton loading fullWidth variant="contained">
              <span>Submit</span>
            </LoadingButton>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Toaster />
    </Container>
  );
}
