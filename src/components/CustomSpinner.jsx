import { Box, CircularProgress } from "@mui/material";

const CustomSpinner = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure the loader is on top of other elements
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CustomSpinner;
