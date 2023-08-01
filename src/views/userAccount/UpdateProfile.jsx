import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import ProfileBox from "../../components/ProfileBox";

const UpdateProfile = ({ user }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box
      gridColumn="span 12"
      gridRow="span 3"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="10px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      >
        <ProfileBox user={user} theme={theme} />
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          p="1.25rem 1rem"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: "bolder" }} variant="h6" gutterBottom>
              Update Your Profile
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
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateProfile;
