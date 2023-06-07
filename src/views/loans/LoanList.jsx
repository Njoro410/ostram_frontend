import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useGetAllLoansQuery } from "../../services/loans/loanSlices";
import CustomTabs from "../../components/CustomTabs";
import MUIDataGrid from "../../components/MUIDataGrid";

const LoanList = () => {
  const { data: loans, isLoading } = useGetAllLoansQuery();
  const [loanData, setLoanData] = useState([]);
  const [activeLoanTab, setActiveLoanTab] = useState(0);

  const handleLoanTabChange = (event, newValue) => {
    setActiveLoanTab(newValue);
  };

  useEffect(() => {
    if (loans?.results) {
      const modifiedData = loans.results.map((item) => {
        const { guarantors, ...remainingData } = item;
        return remainingData;
      });
      setLoanData(modifiedData);
    }
  }, [loans]);

  function groupLoansByStatus(loanData) {
    const groupedLoans = loanData.reduce((result, loan) => {
      const { status, ...remainingData } = loan;
      if (!result[status]) {
        result[status] = [];
      }
      result[status].push({ ...loan, status });
      return result;
    }, {});

    const groupedLoansArray = Object.entries(groupedLoans).map(
      ([status, loans]) => ({
        status,
        loans,
      })
    );

    return groupedLoansArray;
  }

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "lendee", headerName: "Member Name", width: 200 },
    { field: "loan_type", headerName: "Loan Type", width: 200 },
    { field: "status", headerName: "Loan Status", width: 200 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "application_date", headerName: "Application Date", width: 200 },
    { field: "issue_date", headerName: "Issue Date", width: 200 },
    { field: "payment_frequency", headerName: "Payment Frequency", width: 150 },
  ];

  const loanTabs = [
    {
      label: "All Loans",
      tooltip: " All loans regardless of criteria.",
    },
    {
      label: "APPROVED",
      tooltip:
        " The loan application has been reviewed and approved for disbursement.",
    },
    {
      label: "In Progress",
      tooltip: " The loan has been approved and is currently being processed..",
    },
    {
      label: "Pending",
      tooltip:
        " The loan application is under review and a decision is pending.",
    },
    {
      label: "Disbursed",
      tooltip: " The loan amount has been disbursed to the borrower.",
    },
    {
      label: "Denied",
      tooltip:
        "The loan application has been reviewed and denied for disbursement.",
    },
    {
      label: "Repaid",
      tooltip: " The loan has been fully repaid by the borrower.",
    },
    {
      label: "Default",
      tooltip:
        " The borrower has failed to make repayments according to the loan agreement.",
    },
    {
      label: "Closed",
      tooltip:
        " The loan has been closed, indicating that all loan activities are completed.",
    },
    {
      label: "Cancelled",
      tooltip:
        " The loan application or agreement has been canceled before approval or disbursement.",
    },
    {
      label: "On Hold",
      tooltip:
        " The loan processing or repayment has been put on hold temporarily.",
    },
  ];

  // Filter the loan data based on the active loan tab
  let filteredLoanData = loanData;
  if (activeLoanTab !== 0) {
    const selectedStatus = loanTabs[activeLoanTab].label.toUpperCase();
    const groupedLoans = groupLoansByStatus(loanData);
    const selectedGroup = groupedLoans.find(
      (group) => group.status === selectedStatus
    );
    filteredLoanData = selectedGroup ? selectedGroup.loans : [];
  }

  return (
    <Box mt="2rem">
      <Header title="LOANS LIST" subtitle="A data grid of all members" />
      <CustomTabs
        tabs={loanTabs}
        value={activeLoanTab}
        onChange={handleLoanTabChange}
      />

      <MUIDataGrid rows={filteredLoanData} columns={columns} />
    </Box>
  );
};

export default LoanList;
