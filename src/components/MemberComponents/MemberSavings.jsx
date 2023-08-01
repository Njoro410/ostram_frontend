import React, { useState, useEffect } from "react";
import CustomSpinner from "../CustomSpinner";
import { Box } from "@mui/material";
import { useGetMemberSavingsQuery } from "../../services/savings/savingsSlice";
import { useTheme } from "@mui/material/styles";

const MemberSavings = ({ mbr_no }) => {
  const theme = useTheme();
  // fetch savings
  const [savingsData, setSavings] = useState([]);
  const { data: savings, isLoading } = useGetMemberSavingsQuery(mbr_no);
  useEffect(() => {
    if (savings) {
      setSavings(savings.data);
    }
  }, [savings]);
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
      {/* <p>display loans</p> */}
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          <p>savings here</p>
        </>
      )}
    </Box>
  );
};

export default MemberSavings;
