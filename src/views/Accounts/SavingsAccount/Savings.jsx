import { Box, Button, useTheme } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import CustomTabs from "../../../components/CustomTabs";
import SavingsDashboard from "./SavingDashboard";
import MemberSavings from "./MemberSavings";




const Savings = () => {
  const [activeSavingsTab, setActiveSavingsTab] = useState(0);

  const handleSavingsTabChange = (event, newValue) => {
    setActiveSavingsTab(newValue);
  };

  const savingsTabs = [
    {
      label: "Savings Dashboard",
    },
    {
      label: "Member Savings",
    },

  ];
  const theme = useTheme();
  return (
    <Box m="5.5rem 2.5rem">
      <CustomTabs
        tabs={savingsTabs}
        value={activeSavingsTab}
        onChange={handleSavingsTabChange}
      />
      {activeSavingsTab === 0 && <SavingsDashboard />}
      {activeSavingsTab === 1 && <MemberSavings />}

    </Box>
  );
};

export default Savings;
