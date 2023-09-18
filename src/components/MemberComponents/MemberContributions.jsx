import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import CustomSpinner from "../../components/CustomSpinner";
import Datagrid, { columnProperties } from "../../components/Datagrid";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import formatDate from "../../utils/formatDate";
import ExportExcel from "../ExportExcel";
import { DatePickerInput } from "@mantine/dates";
import { useGetMemberContributionsQuery } from "../../services/contributions/contributionSlices";
import { useParams } from "react-router-dom";

export default function MemberContributions() {
  const theme = useTheme();
  const { memberNo } = useParams();

  const [reportData, setReportData] = useState([]);

  const { data: contributions, isLoading } =
    useGetMemberContributionsQuery(memberNo);

  const [value, setValue] = useState([null, null]);
  console.log(value, "picked value");

  useEffect(() => {
    console.log("useEffect1");
    if (contributions) {
      console.log(contributions?.results, "contributions");
      // Filter reportData based on the selected date range
      const [fromDate, toDate] = value;
      const filteredData = contributions.results.filter((item) => {
        const itemDate = new Date(item.received_date).getTime();
        return (
          (!fromDate || itemDate >= fromDate.getTime()) &&
          (!toDate || itemDate <= toDate.getTime())
        );
      });

      setReportData(filteredData);
    }
  }, [value, contributions]);

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
    <Box
      gridColumn="span 12"
      gridRow="span 1"
      p="1.25rem 1rem"
      // backgroundColor={theme.palette.background.alt}
      mb={1.5}
      // sx={{
      //   border: (theme) => `1px solid ${theme.palette.divider}`,
      //   borderRadius: 1,
      // }}
    >
      <FlexBetween>
        <DatePickerInput
          type="range"
          // label="Filter transactions"
          placeholder="Filter contributions by period..."
          value={value}
          onChange={setValue}
          clearable={true}
          mb={"25px"}
        />
        <ExportExcel
          excelData={contributions?.results}
          fileName={"Daily contributions spreadsheet"}
        />
      </FlexBetween>
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
}
