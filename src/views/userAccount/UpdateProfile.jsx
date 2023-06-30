import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React from "react";

const UpdateProfile = () => {
  const theme = useTheme();
  return (
    <Box>
      {" "}
      <Typography sx={{ fontWeight: "bolder" }} variant="h6" gutterBottom>
        Update Your Porfile
      </Typography>
      <Box>
        <Box display="flex" gap="1rem">
          <TextField
            margin="normal"
            required
            fullWidth
            id="principal_amount"
            label="Email"
            name="principal_amount"
            autoComplete="names"
            autoFocus
            sx={{
              mt: 2.5,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="principal_amount"
            label="Current Password"
            name="principal_amount"
            autoComplete="names"
            autoFocus
            sx={{
              mt: 2.5,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="principal_amount"
            label="Current Password"
            name="principal_amount"
            autoComplete="names"
            autoFocus
            sx={{
              mt: 2.5,
            }}
          />
        </Box>
        <Box display="flex" gap="1rem">
          <TextField
            margin="normal"
            required
            fullWidth
            id="principal_amount"
            label="New Password"
            name="principal_amount"
            autoComplete="names"
            autoFocus
            sx={{
              mt: 2.5,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="principal_amount"
            label="Current Password"
            name="principal_amount"
            autoComplete="names"
            autoFocus
            sx={{
              mt: 2.5,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="principal_amount"
            label="Re-type New Password"
            name="principal_amount"
            autoComplete="names"
            autoFocus
            sx={{
              mt: 2.5,
            }}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            p: 2,
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

export default UpdateProfile;
