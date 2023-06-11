import { Box } from "@mui/material";
import React, { useState } from "react";
import CustomTabs from "../../components/CustomTabs";
import LoanList from "./LoanList";
import LoanDashbord from "./LoanDashbord";
import LoanProducts from "./LoanProducts";

const Loans = () => {
  const [activeLoanViewTab, setActiveLoanViewTab] = useState(0);

  const handleLoanViewTabChange = (event, newValue) => {
    setActiveLoanViewTab(newValue);
  };

  const loanViewTabs = [
    {
      label: "Loan Analysis",
    },
    {
      label: "Loan Portfolio",
    },
    {
      label: "Loan Products",
    },
    {
      label: "Loan Documents",
    },
    {
      label: "Loan Assets",
    },
    {
      label: "Process Loan",
    },
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <CustomTabs
        tabs={loanViewTabs}
        value={activeLoanViewTab}
        onChange={handleLoanViewTabChange}
      />

      {activeLoanViewTab === 0 && <LoanDashbord />}
      {activeLoanViewTab === 1 && <LoanList />}
      {activeLoanViewTab === 2 && <LoanProducts />}
    </Box>
  );
};

export default Loans;
