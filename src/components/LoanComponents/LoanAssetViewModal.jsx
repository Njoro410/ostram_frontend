import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useGetLoanAssetDocumentsQuery } from "../../services/loans/loanSlices";
import LoanAssetCard from "./LoanAssetCard";

const LoanAssetViewModal = ({ open, onClose }) => {
  const theme = useTheme();

  const {
    data: documents,
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetLoanAssetDocumentsQuery();

  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: theme.palette.background.alt,
        },
      }}
      open={open}
      onClose={onClose}
      maxWidth="md"
    >
      <DialogContent sx={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
        {documents?.results.map((document, i) => (
          <LoanAssetCard keyy={i} isInModal={true} asset={document} />
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary.light}
            gutterBottom
            variant="button"
            display="block"
          >
            Cancel
          </Typography>
        </Button>
        <Button>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary.light}
            gutterBottom
            variant="button"
            display="block"
          >
            Submit
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanAssetViewModal;
