import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetContributionsQuery } from "../../services/contributions/contributionSlices";
import CustomSpinner from "../../components/CustomSpinner";
import Datagrid, { columnProperties } from "../../components/Datagrid";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import formatDate from "../../utils/formatDate";
import ExportExcel from "./ExportExcel";

const Reports = () => {
  const theme = useTheme();

  const [reportData, setReportData] = useState([]);

  const { data: contributions, isLoading } = useGetContributionsQuery();

  const ExcelExportData = [
    {
      "First Name": "Arul ",
      "Last Name": "prasath",
      "Employee code": "001",
      "Mobile No": "1234567890",
      DOB: "91-01-1995",
      Address: "Chennai",
    },
    {
      "Fipst Name": "Balu",
      "Last Name": "Subramani",
      "Employee code": "902",
      "Mobile No": "8787987898",
      DOB: "02-02-2000",
      Address: "be",
    },
    {
      "First Name": "Chandru ",
      "Last Name": "kumar",
      "Employee code": "603",
      "Mobile No": "5467678987",
      DOB: "03-03-1997",
      Address: "vellore",
    },
  ];

  useEffect(() => {
    if (contributions) {
      setReportData(contributions.results);
    }
  }, [contributions]);

  console.log(contributions, "contributions for");

  const columns = [
    {
      field: "received_date",
      headerName: "Date",
      headerClassName: "primary-color",
      valueGetter: (params) => formatDate(params.row.received_date),
      ...columnProperties,
    },
    {
      field: "account_no",
      headerName: "A/C No",
      ...columnProperties,
    },
    {
      field: "savings",
      headerName: "Savings",
      ...columnProperties,
    },
    { field: "deposits", headerName: "Deposits", ...columnProperties },
    {
      field: "loan_repayment",
      headerName: "Loan Repayment",
      ...columnProperties,
    },
    {
      field: "loan_interest",
      headerName: "Loan Interest",
      ...columnProperties,
    },
    {
      field: "maintenance_fee",
      headerName: "Maintenance Fee",
      ...columnProperties,
    },
    {
      field: "general_charges",
      headerName: "General Charges",
      ...columnProperties,
    },
    {
      field: "late_charges",
      headerName: "Late Charges",
      ...columnProperties,
    },
    {
      field: "loan_insurance",
      headerName: "Loan Insurance Fee",
      ...columnProperties,
    },
    {
      field: "loan_processing",
      headerName: "Loan Processing Fee",
      ...columnProperties,
    },
    {
      field: "affidavit_fee",
      headerName: "Affidavit Fee",
      ...columnProperties,
    },
  ];

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="REPORTS" subtitle="A statement of contributions made" />
      <p>Export</p>
      <ExportExcel
        excelData={contributions?.results}
        fileName={"Excel Export"}
      />

      <FlexBetween borderRadius="9px" gap="3rem" p="0.1rem 1.5rem">
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <Datagrid
            rows={reportData}
            columns={columns}
            getRowId={(row) => row.id}
            key={reportData.id}
          />
        )}
      </FlexBetween>
    </Box>
  );
};

export default Reports;
