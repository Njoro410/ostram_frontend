import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ProfileBox from "../../../components/ProfileBox";
import ChangePassword from "./ChangePassword";
import MFA from "./MFA";

const Security = ({ user, activeSecurityTab }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
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
        height="fit-content"
        p="1.25rem 1rem"
        backgroundColor={theme.palette.background.alt}
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
        }}
      >
        <Box>
          {activeSecurityTab === 0 && <ChangePassword />}
          {activeSecurityTab === 1 && <MFA user={user} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Security;
