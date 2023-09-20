import { Box, Button, useTheme } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import CustomTabs from "../../../components/CustomTabs";
import ApproveLoans from "./ApproveLoans";
import GuaranteeLoan from "./GuaranteeLoan";
import DisburseLoan from "./DisburseLoan";
import CancelLoan from "./CancelLoan";
import CloseLoan from "./CloseLoan";
import OnHold from "./OnHold";
import RejectLoan from "./RejectLoan";

const ProcessLoans = () => {
  const [activeLoanProcessingTab, setActiveLoanProcessingTab] = useState(0);

  const handleLoanProcessingTabChange = (event, newValue) => {
    setActiveLoanProcessingTab(newValue);
  };

  const loanProcessingTabs = [
    {
      label: "Approve Application",
    },
    {
      label: "Guarantee Loan",
    },
    {
      label: "Disberse Loan",
    },
    {
      label: "Cancel Application",
    },
    {
      label: "Close Loan",
    },
    {
      label: "Put On Hold",
    },
    {
      label: "Reject Application",
    },
    
  ];
  const theme = useTheme();
  return (
    <Box mt="1rem">
      <FlexBetween>
        <Header
          title="PROCESS LOANS"
          subtitle="Streamline your finances with hassle-free loan processing"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mb: "25px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
            }}
          >
            ADD LOAN
          </Button>
        </Box>
      </FlexBetween>
      <CustomTabs
        tabs={loanProcessingTabs}
        value={activeLoanProcessingTab}
        onChange={handleLoanProcessingTabChange}
      />
      {activeLoanProcessingTab === 0 && <ApproveLoans />}
      {activeLoanProcessingTab === 1 && <GuaranteeLoan />}
      {activeLoanProcessingTab === 2 && <DisburseLoan />}
      {activeLoanProcessingTab === 3 && <CancelLoan />}
      {activeLoanProcessingTab === 4 && <CloseLoan />}
      {activeLoanProcessingTab === 5 && <OnHold />}
      {activeLoanProcessingTab === 6 && <RejectLoan />}
    </Box>
  );
};

export default ProcessLoans;
