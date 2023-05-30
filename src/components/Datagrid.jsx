import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const Datagrid = ({ columns, rows, getRowId }) => {
  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
        "& .MuiDataGrid-root": {
          border: "none",
          "& .MuiDataGrid-cell": {
            border: "none",
          },
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={50}
        getRowId={getRowId}
      />
    </Box>
  );
};
export default Datagrid;
