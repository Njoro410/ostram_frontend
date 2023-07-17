import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomSpinner from "../CustomSpinner";
import { useLazyGetMemberLoansQuery } from "../../services/loans/loanSlices";

const MemberLoans = ({ mbr_no }) => {
  const theme = useTheme();

  // fetch loans
  const [memberLoans, setMemberLoans] = useState([]);
  const [getMemberLoans, { isLoading }] = useLazyGetMemberLoansQuery();
  useEffect(() => {
    getMemberLoans(mbr_no).then((response) => {
      setMemberLoans(response.data);
    });
  }, []);

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
          <p>loans here</p>
        </>
      )}
    </Box>
  );
};

export default MemberLoans;
