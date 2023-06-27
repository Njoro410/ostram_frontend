import { DataGrid } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";

export const columnProperties = {
  sortable: false,
  filterable: false,
  flex: 1,
};

const Datagrid = ({ columns, rows, getRowId, isLoanList }) => {
  const theme = useTheme();
  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      padding="1rem"
      borderRadius="0.55rem"
      marginTop={isLoanList ? 2: 0}
      sx={{
        height: 550,
        width: "100%",
        "& .MuiDataGrid-root": {
          border: "none",
          "& .MuiDataGrid-cell": {
            border: "none",
            backgroundColor:theme.palette.background.default
          },
        },
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
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
