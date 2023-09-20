import styled from "@emotion/styled";
import { Dialog } from "@mui/material";

export const GlassDialog = styled(Dialog)(({ theme }) => ({
  backgroundColor: "rgba(87, 86, 86, 0.25)",
  backdropFilter: "blur(5px)",
  "& .MuiDialog-paper": {
    backgroundColor: "rgba(0, 0, 0, 0.375)",
    backdropFilter: "blur(5px)",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    color: theme.palette.secondary[200]
  },
}));
