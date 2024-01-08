import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Container } from "@mui/material";
import Logo from "../../assets/ostlogo.png";
import SamsLogo from "../../assets/samslogo.png"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setCSRFToken,
  setAccessToken,
  setRefreshToken,
} from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { notifications } from "@mantine/notifications";
import CancelIcon from "@mui/icons-material/Cancel";
import SignInForm from "./SignInForm";
import AuthenticatorForm from "./AuthenticatorForm";
import { loginValidationSchema } from "../../utils/validationSchema";
import { Copyright } from "@mui/icons-material";

const SignInMain = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isAuthenticator, setIsAuthenticator] = useState(false);

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
      setIsAuthenticator(userData.data.isAuthenticated);

      reset();

      if (!userData.data.isAuthenticated) {
        navigate("/dashboard");
      }
    } catch (err) {
      notifications.show({
        id: "load-data",
        color: "red",
        title: err?.data?.detail,
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

  const handleBackClick = () => {
    setIsAuthenticator(false);
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
            height: 350,
            width: 400,
            maxHeight: { xs: 233, md: 250 },
            maxWidth: { xs: 350, md: 500 },
          }}
          mt={10}
          alt="Ostram Logo"
          src={SamsLogo}
        />
        {isAuthenticator ? (
          <AuthenticatorForm onBackClick={handleBackClick} />
        ) : (
          <SignInForm
            onSubmitHandler={handleSubmit(onSubmitHandler)}
            errors={errors}
            isLoading={isLoading}
            register={register}
          />
        )}
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignInMain;
