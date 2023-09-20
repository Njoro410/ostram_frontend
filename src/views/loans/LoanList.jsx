import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useGetAllLoansQuery } from "../../services/loans/loanSlices";
import CustomTabs from "../../components/CustomTabs";
import MUIDataGrid from "../../components/MUIDataGrid";
import Datagrid, { columnProperties } from "../../components/Datagrid";

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
      const { status_name, ...remainingData } = loan;
      if (!result[status_name]) {
        result[status_name] = [];
      }
      result[status_name].push({ ...loan, status_name });
      return result;
    }, {});

    const groupedLoansArray = Object.entries(groupedLoans).map(
      ([status_name, loans]) => ({
        status_name,
        loans,
      })
    );

    return groupedLoansArray;
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      ...columnProperties,
      minWidth: 50,
    },
    {
      field: "lendee",
      headerName: "Member Name",
      ...columnProperties,
      minWidth: 250,
    },
    {
      field: "loan_product_name",
      headerName: "Loan Product",
      ...columnProperties,
      minWidth: 100,
    },
    {
      field: "status_name",
      headerName: "Loan Status",
      ...columnProperties,
      minWidth: 100,
    },
    {
      field: "principal_amount",
      headerName: "Principal Amount",
      ...columnProperties,
      minWidth: 100,
    },
    {
      field: "remaining_balance",
      headerName: "Remaining Balance",
      ...columnProperties,
      minWidth: 100,
    },
    {
      field: "total_interest",
      headerName: "Total Interest",
      ...columnProperties,
      minWidth: 100,
    },
    {
      field: "total_payment",
      headerName: "Total Payment",
      ...columnProperties,
      minWidth: 100,
    },
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
      label: "PENDING",
      tooltip:
        " The loan application is under review and a decision is pending.",
    },
    {
      label: "Disbursed",
      tooltip: " The loan amount has been disbursed to the borrower.",
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
    {
      label: "Denied",
      tooltip:
        "The loan application has been reviewed and denied for disbursement.",
    },
  ];

  let filteredLoanData = loanData;
  if (activeLoanTab !== 0) {
    const selectedStatus = loanTabs[activeLoanTab].label.toUpperCase();
    const groupedLoans = groupLoansByStatus(loanData);
    const selectedGroup = groupedLoans.find(
      (group) => group.status_name === selectedStatus
    );
    filteredLoanData = selectedGroup ? selectedGroup.loans : [];
  }

  return (
    <Box mt="1rem">
      <Header title="LOANS LIST" subtitle="A data grid of all members" />
      <CustomTabs
        tabs={loanTabs}
        value={activeLoanTab}
        onChange={handleLoanTabChange}
      />

      <Datagrid
        rows={filteredLoanData}
        columns={columns}
        getRowId={(row) => row.id}
        key={filteredLoanData.id}
        isLoanList
      />
    </Box>
  );
};

export default LoanList;
