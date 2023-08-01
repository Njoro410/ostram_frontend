import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetContributionsQuery } from "../../services/contributions/contributionSlices";
import CustomSpinner from "../../components/CustomSpinner";
import Datagrid, { columnProperties } from "../../components/Datagrid";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import formatDate from "../../utils/formatDate";
import ExportExcel from "./ExportExcel";
import ReportsFilter from "../../components/ContributionsComponents/ReportsFilter";
import { DatePickerInput } from "@mantine/dates";

const Reports = () => {
  const theme = useTheme();

  const [reportData, setReportData] = useState([]);

  const { data: contributions, isLoading } = useGetContributionsQuery();
  const [value, setValue] = useState([null, null]);
  console.log(value, "picked value");

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
      <FlexBetween>
        <Header title="REPORTS" subtitle="A statement of contributions made" />
        <ExportExcel
          excelData={contributions?.results}
          fileName={"Excel Export"}
        />
      </FlexBetween>
      <DatePickerInput
        type="range"
        label="Filter transactions"
        placeholder="Select month or period"
        value={value}
        onChange={setValue}
        mx="auto"
        maw={400}
      />
      <FlexBetween borderRadius="9px" gap="3rem">
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
