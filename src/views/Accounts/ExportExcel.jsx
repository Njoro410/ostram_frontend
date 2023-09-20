import React from "react";
import { Tooltip, Button, useTheme } from "@mui/material";
import * as XLSX from "xlsx";

const ExportExcel = ({ excelData, fileName }) => {
  const theme = useTheme();

  const fileExtension = ".xlsx";

  const heading = [
    [
      "SAVINGS",
      "DEPOSITS",
      "LOAN REPAYMENT",
      "LOAN INTEREST",
      "TOTAL",
      "M/FEE",
      "GENERAL CHARGES",
      "LATE CHARGES",
      "LOAN PROCESSING FEE 1.2%",
      "LOAN INSURANCE FEE 1.2%",
      "AFFIDAVIT FEE",
      "DATE",
      "A/C No",
    ],
  ];

  const columnsToExclude = ["created_on", "created_by", "received_by", "id"];
  // remove columns
  const filteredData = excelData?.map((data) =>
    Object.keys(data).reduce((acc, key) => {
      if (!columnsToExclude.includes(key)) {
        acc[key] = data[key];
      }
      return acc;
    }, {})
  );

  const exportToExcel = () => {
    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet([]);
    // Create workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, heading);
    XLSX.utils.sheet_add_json(ws, filteredData, {
      origin: "A2",
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, fileName + fileExtension);
  };

  return (
    <>
      <Tooltip title="Excel Export">
        <Button
          onClick={exportToExcel}
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
          Export Excel
        </Button>
      </Tooltip>
    </>
  );
};

export default ExportExcel;
