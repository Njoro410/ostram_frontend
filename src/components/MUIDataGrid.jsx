import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";

const MUIDataGrid = ({ columns, rows }) => {
  const theme = useTheme();
  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      padding="1rem"
      borderRadius="0.55rem"
      marginTop={2}
      sx={{
        height: 440,
        width: "100%",
        "& .MuiDataGrid-root": {
          border: "none",
          backgroundColor: theme.palette.background.default,
          padding: 1,
          "& .MuiDataGrid-cell": {
            border: "none",
          },
        },
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
      }}
    >
      <DataGrid
        slots={{
          toolbar: GridToolbar,
        }}
        rows={rows}
        columns={columns}
        autoHeight={true}
        key={rows?.id}
      />
    </Box>
  );
};

export default MUIDataGrid;
