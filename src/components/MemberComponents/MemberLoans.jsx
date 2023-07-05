import React from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MemberLoans = ({ mbr_no }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 12"
      gridRow="span 1"
      display="flex"
      p="1.25rem 1rem"
      backgroundColor={theme.palette.background.alt}
      mb={1.5}
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <p>member things here </p>
    </Box>
  );
};

export default MemberLoans;
