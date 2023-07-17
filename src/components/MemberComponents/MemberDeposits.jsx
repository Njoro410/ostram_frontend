import React, { useState, useEffect } from "react";
import CustomSpinner from "../CustomSpinner";
import { Box } from "@mui/material";
import { useGetMemberDepositsQuery } from "../../services/deposits/depositSlice";
import { useTheme } from "@mui/material/styles";

const MemberDeposits = ({ mbr_no }) => {
  const theme = useTheme();

  // fetch deposits
  const [depositsData, setDeposits] = useState([]);
  const { data: deposits, isLoading } = useGetMemberDepositsQuery(mbr_no);
  useEffect(() => {
    if (deposits) {
      setDeposits(deposits.data);
    }
  }, [deposits]);

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
          <p>deposits here</p>
        </>
      )}
    </Box>
  );
};

export default MemberDeposits;
