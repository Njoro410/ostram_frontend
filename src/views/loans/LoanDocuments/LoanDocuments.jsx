import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import CustomTabs from "../../../components/CustomTabs";
import AllDocuments from "./AllDocuments";
import SpecificLoanDocument from "./SpecificLoanDocument";
import { useLazyGetLoanDocumentsQuery } from "../../../services/loans/loanSlices";
import AddLoanDocumentTypeModal from "../../../components/LoanComponents/AddLoanDocumentTypeModal";
import AddLoanDocumentModal from "../../../components/LoanComponents/AddLoanDocumentModal";

const LoanDocuments = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const [activeDocViewTab, setActiveDocViewTab] = useState(0);

  const handleDocViewTabChange = (event, newValue) => {
    setActiveDocViewTab(newValue);
  };

  const DocViewTabs = [
    {
      label: "All Documents",
    },
    {
      label: "Loan Documents",
    },
  ];

  const [getLoanDocuments, { data: documents }] =
    useLazyGetLoanDocumentsQuery();

  useEffect(() => {
    getLoanDocuments();
  }, []);

  return (
    <Box mt="1rem">
      {/* <AddLoanDocumentTypeModal open={openModal} onClose={handleModalClose} /> */}
      <AddLoanDocumentModal open={openModal} onClose={handleModalClose} />
      <FlexBetween>
        <Header
          title="LOAN DOCUMENTS"
          subtitle="Details about loan documents"
        />

        <Box display="flex" gap={1}>
          <Button
            onClick={handleModalOpen}
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
            Add Loan Document Type
          </Button>
          <Button
            onClick={handleModalOpen}
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
            Add Loan Document
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        borderRadius="0.55rem"
        p="1rem"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {" "}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Total Documents Available
          </Typography>
          <Typography variant="h1" sx={{ color: theme.palette.secondary[100] }}>
            18
          </Typography>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {" "}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Loans Without Documents
          </Typography>
          <Typography variant="h1" sx={{ color: theme.palette.secondary[100] }}>
            4
          </Typography>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          paddingY={2}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {" "}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Document Types Available
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
            KRA Pin
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
            ID Copy
          </Typography>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {" "}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Pending Documents
          </Typography>
          <Typography variant="h1" sx={{ color: theme.palette.secondary[100] }}>
            5
          </Typography>
        </Box>
        <Box
          gridColumn="span 2"
          gridRow="span 1"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {" "}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Accepted Documents
          </Typography>
          <Typography variant="h1" sx={{ color: theme.palette.secondary[100] }}>
            4
          </Typography>
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 1"
          p="1.25rem 1rem"
          backgroundColor={theme.palette.background.alt}
          height="fit-content"
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <CustomTabs
            tabs={DocViewTabs}
            value={activeDocViewTab}
            onChange={handleDocViewTabChange}
          />
          {activeDocViewTab === 0 && (
            <AllDocuments documents={documents?.results} />
          )}
          {activeDocViewTab === 1 && <SpecificLoanDocument />}
        </Box>
      </Box>
    </Box>
  );
};

export default LoanDocuments;
