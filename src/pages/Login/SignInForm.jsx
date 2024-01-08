import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignInForm = ({ onSubmitHandler, errors, isLoading, register }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmitHandler}
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
          fontWeight: "bolder",
          textTransform: "uppercase",
          fontSize: "1.5rem",
          textAlign: "center",
        }}
      >
        Staff Sign in
      </Typography>
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
            p: 2,
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
        <LoadingButton loading fullWidth variant="contained" sx={{ p: 2 }}>
          <span>Submit</span>
        </LoadingButton>
      )}
    </Box>
  );
};

export default SignInForm;
