import React, { useState, useEffect } from "react";
import CustomSpinner from "../CustomSpinner";
import { useGetMemberSavingsQuery } from "../../services/savings/savingsSlice";
import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import FlexBetween from "../FlexBetween";
import Header from "../Header";
import { useTheme } from "@emotion/react";
import SplineArea from "../../charts/SplineArea";
import AccountSparkline from "../../charts/AccountSplineArea";
import AccountSplineArea from "../../charts/AccountSplineArea";
import ZoomableTimeseries from "../../charts/MixedYAxis";
import BarChart from "../../charts/BarChart";
import MixedYAxis from "../../charts/MixedYAxis";
import AddSavingsModal from "../SavingsComponents/AddSavingsModal";

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
