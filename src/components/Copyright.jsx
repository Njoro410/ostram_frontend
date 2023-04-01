import { Typography } from '@mui/material';
import React from 'react'
import Link from "@mui/material/Link";

const Copyright = () => {
    return (
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {"Copyright © "}
          <Link color="inherit" href="www.ostramsacco.co.ke">
            Ostram Saccco
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      );
}

export default Copyright