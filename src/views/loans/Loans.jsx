import { Box } from "@mui/material";
import React, { useState } from "react";
import CustomTabs from "../../components/CustomTabs";
import LoanList from "./LoanList";
import LoanDashbord from "./LoanDashbord";
import LoanProducts from "./LoanProducts";
import LoanDocuments from "./LoanDocuments/LoanDocuments";
import LoanAssets from "./LoanAssets/LoanAssets";
import ProcessLoans from "./ProcessLoans/ProcessLoans";
import ViewLoan from "./ViewLoan";

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
      label: "View Loan",
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
    {
      label: "Loan Calculator",
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
      {activeLoanViewTab === 2 && <ViewLoan />}
      {activeLoanViewTab === 3 && <LoanProducts />}
      {activeLoanViewTab === 4 && <LoanDocuments />}
      {activeLoanViewTab === 5 && <LoanAssets />}
      {activeLoanViewTab === 6 && <ProcessLoans />}
    </Box>
  );
};

export default Loans;
