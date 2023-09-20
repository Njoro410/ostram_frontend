import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const ProfileBox = ({ user, theme }) => {
  return (
    <Box
      gridColumn="span 12"
      gridRow="span 1"
      display="flex"
      p="1.25rem 1rem"
      backgroundColor={theme.palette.background.alt}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <Box mt={1.8}>
        <Avatar
          alt={user?.results?.first_name}
          src="https://xsgames.co/randomusers/avatar.php?g=male"
          sx={{ width: 96, height: 96 }}
        />
      </Box>
      <Box m={2.5}>
        <Typography sx={{ fontWeight: "900" }} variant="h6" gutterBottom>
          {user?.results?.title}. {user?.results?.first_name}{" "}
          {user?.results?.last_name}
        </Typography>
        <Typography sx={{}} variant="h6" gutterBottom>
          Operations Manager
        </Typography>
        <Typography sx={{}} variant="h6" gutterBottom>
          Kajiado, Branch
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileBox;
