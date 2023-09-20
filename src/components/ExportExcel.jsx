import React,{useState} from "react";
import { Tooltip, Button, useTheme , Snackbar} from "@mui/material";
import * as XLSX from "xlsx";

const ExportExcel = ({ excelData, fileName }) => {
  const theme = useTheme();
  const [exporting, setExporting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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
  // remove columns to be excluded from the report
  const filteredData = excelData?.map((data) =>
    Object.keys(data).reduce((acc, key) => {
      if (!columnsToExclude.includes(key)) {
        acc[key] = data[key];
      }
      return acc;
    }, {})
  );

  const exportToExcel = () => {
    setSnackbarOpen(true)
    const ws = XLSX.utils.json_to_sheet([]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.sheet_add_aoa(ws, heading);
    XLSX.utils.sheet_add_json(ws, filteredData, {
      origin: "A2",
      skipHeader: true,
    });
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, fileName + fileExtension);
  };

  const handleCloseSnackbar = () =>{
    setSnackbarOpen(false)
  }

  return (
    <React.Fragment><Tooltip title="Excel Export">
    <Button
      onClick={exportToExcel}
      disabled={!excelData || excelData.length === 0}
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
  <Snackbar
  open={snackbarOpen}
  message="Spreadsheet is being downloaded..."
  autoHideDuration={2500}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  style={{
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.background.alt,
  }}
  />
</React.Fragment>
      
  );
};

export default ExportExcel;
