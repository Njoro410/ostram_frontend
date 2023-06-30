import { Box, Button, useTheme } from "@mui/material";
import React, { useState } from "react";
import CustomTabs from "../../../components/CustomTabs";
import MemberDeposits from "./MemberDeposits";
import DepositsDashboard from "./DepositDashboard";




const Deposits = () => {
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
      {activeSavingsTab === 0 && <DepositsDashboard />}
      {activeSavingsTab === 1 && <MemberDeposits />}

    </Box>
  );
};

export default Deposits;
