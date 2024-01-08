import { Box, Button, useTheme } from "@mui/material";
import React, { useState } from "react";
import CustomTabs from "../../../components/CustomTabs";
import MemberDeposits from "./MemberDeposits";
import DepositsDashboard from "./DepositDashboard";




const Deposits = () => {
  const [activeDepositsTab, setActiveDepositsTab] = useState(0);

  const handleDepositsTabChange = (event, newValue) => {
    setActiveDepositsTab(newValue);
  };

  const depositsTabs = [
    {
      label: "Savings Dashboard",
    },
    {
      label: "Member Deposits",
    },

  ];
  const theme = useTheme();
  return (
    <Box m="5.5rem 2.5rem">
      <CustomTabs
        tabs={depositsTabs}
        value={activeDepositsTab}
        onChange={handleDepositsTabChange}
      />
      {activeDepositsTab === 0 && <DepositsDashboard />}
      {activeDepositsTab === 1 && <MemberDeposits />}

    </Box>
  );
};

export default Deposits;
