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
import AllAssets from "./AllAssets";
import SpecificLoanAssets from "./SpecificLoanAssets";
import { useLazyGetLoanAssetsQuery } from "../../../services/loans/loanSlices";
import AddLoanAssetModal from "../../../components/LoanComponents/AddLoanAssetModal";

const LoanAssets = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [activeAssetViewTab, setActiveAssetViewTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleAssetViewTabChange = (event, newValue) => {
    setActiveAssetViewTab(newValue);
  };

  const AssetViewTabs = [
    {
      label: "All Assets",
    },
    {
      label: "Loan Assets",
    },
  ];

  const [getLoanAssets, { data: assets }] = useLazyGetLoanAssetsQuery();

  useEffect(() => {
    getLoanAssets();
  }, []);

  return (
    <Box mt="1rem">
      <AddLoanAssetModal open={openModal} onClose={handleModalClose} />
      <FlexBetween>
        <Header
          title="LOAN ASSETS"
          subtitle="Details about loan assets and collaterals"
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
            Add Loan Asset
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
          gridColumn="span 4"
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
            Total Loan Assets Available
          </Typography>
          <Typography variant="h1" sx={{ color: theme.palette.secondary[100] }}>
            35
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
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {" "}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Total Pending Assets
          </Typography>
          <Typography variant="h1" sx={{ color: theme.palette.secondary[100] }}>
            15
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
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {" "}
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Approved Assets
          </Typography>
          <Typography variant="h1" sx={{ color: theme.palette.secondary[100] }}>
            2
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
            tabs={AssetViewTabs}
            value={activeAssetViewTab}
            onChange={handleAssetViewTabChange}
          />
          {activeAssetViewTab === 0 && (
            <AllAssets assets={assets?.results} />
          )}
          {activeAssetViewTab === 1 && <SpecificLoanAssets />}
        </Box>
      </Box>
    </Box>
  );
};

export default LoanAssets;
