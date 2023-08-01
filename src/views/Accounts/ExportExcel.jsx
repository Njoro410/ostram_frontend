import React from "react";
import { Tooltip, Button, useTheme } from "@mui/material";
import * as FileSaver from "file-saver";
// import XLSX from "sheetjs-style";
import * as XLSX from "xlsx";

const ExportExcel = ({ excelData, fileName }) => {
  const theme = useTheme();

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const headers = [
    "DATE",
    "A/C No",
    "SAVINGS",
    "DEPOSITS",
    "LOAN RPYMENT",
    "LOAN INTEREST",
    "FORMS",
    "LEDGER CARDS",
    "PASS BOOKS",
    "M/FEE",
    "GENERAL CHARGES",
    "LATE CHARGES",
    "LOAN PROCESSING FEE 1.2%",
    "LOAN INSURANCE FEE 1.2%",
    "AFFIDAVIT FEE",
    "TOTAL",
  ];

  const exportToExcel = () => {
    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Create workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");

    // Convert workbook to binary string
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Create a Blob from the binary string
    const data = new Blob([excelBuffer], { type: fileType });

    // Save the file using FileSaver.js
    FileSaver.saveAs(data, fileName + fileExtension);
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
          Excel Export
        </Button>
      </Tooltip>
    </>
  );
};

export default ExportExcel;
