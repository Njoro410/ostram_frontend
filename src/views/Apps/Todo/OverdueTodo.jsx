import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const OverdueTodo = () => {
  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          m: 3,
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
        variant="h4"
        gutterBottom
      >
        Overdue Todos
      </Typography>
      <Divider variant="middle" />
      <Typography
        sx={{
          textAlign: "center",
          m: 3,
          fontFamily: "monospace",
          fontWeight: "bold",
        }}
        variant="h4"
        gutterBottom
      >
        Empty
      </Typography>
    </Box>
  );
};

export default OverdueTodo;
