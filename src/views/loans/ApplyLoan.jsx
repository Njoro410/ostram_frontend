import { Box, TextField, useMediaQuery } from "@mui/material";
import Header from "../../components/Header";
import React from "react";
import { useTheme } from "@emotion/react";

const ApplyLoan = () => {
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const theme = useTheme();
  return (
    <Box m="5.5rem 2.5rem">
      <Header title="LOAN APPLICATION" subtitle="Apply loans " />

      <Box
        mt="20px"
        component="form"
        // onSubmit={handleSubmit(onSubmitHandler)}
        noValidate
        display="grid"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          display="grid"
          gap="10px"
          gridTemplateColumns="repeat(3, minmax(0, 1fr))"
        >
          <Box mt={5}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
            />
          </Box>

          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
            />
          </Box>

          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="names"
              label="Full Name"
              name="names"
              autoComplete="names"
              autoFocus
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        ></Box>
      </Box>
    </Box>
  );
};

export default ApplyLoan;
