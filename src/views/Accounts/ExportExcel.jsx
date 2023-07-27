import React from "react";
import { Tooltip, Button } from "@mui/material";
import * as FileSaver from "file-saver";
// import XLSX from "sheetjs-style";
import * as XLSX from "xlsx";

const ExportExcel = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

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
          variant="contained"
          onClick={exportToExcel}
          color="primary"
          style={{ cursor: "pointer", fontSize: 14 }}
        >
          Excel Export
        </Button>
      </Tooltip>
    </>
  );
};

export default ExportExcel;
