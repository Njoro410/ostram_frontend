import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const MUIDataGrid = ({ columns, rows }) => {
  return (
    <DataGrid
      slots={{
        toolbar: GridToolbar,
      }}
      rows={rows}
      columns={columns}
      autoHeight={true}
      key={rows?.id}
    />
  );
};

export default MUIDataGrid;
