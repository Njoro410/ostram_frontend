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
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Logo from "../assets/ostlogo.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCSRFToken,
  setAccessToken,
  setRefreshToken,
} from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { notifications } from "@mantine/notifications";
import LoadingButton from "@mui/lab/LoadingButton";
import CancelIcon from "@mui/icons-material/Cancel";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function SignIn() {
  const theme = useTheme();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

      reset();
      navigate("/dashboard");
    } catch (err) {
      notifications.show({
        id: "load-data",
        color: "red",
        title: err?.data?.message,
        message: "Please confirm your email or password is correct.",
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
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
          
          {!isLoading ? (
            <Button
              type="submit"
              {...(errors.email || errors.password ? { disabled: true } : {})}
              fullWidth
              variant="contained"
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
    </Container>
  );
}
