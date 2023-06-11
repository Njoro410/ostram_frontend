import { Box, Button, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import GroupedStackedColumn from "../../charts/GroupedStackedColumn";
import PieChart from "../../charts/PieChart";
import { useGetLoanTypesQuery } from "../../services/loans/loanSlices";
import LoanProductCard from "../../components/LoanComponents/LoanProductCard";
import AddLoanProductModal from "../../components/LoanComponents/AddLoanProductModal";

const LoanProducts = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const {
    data: loan_types,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLoanTypesQuery();

  return (
    <Box mt="2rem">
      <AddLoanProductModal open={openModal} onClose={handleModalClose}/>
      <FlexBetween>
        <Header title="LOAN PRODUCTS" subtitle="Details about loan products" />

        <Box>
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
            Add Loan Product
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        borderRadius="0.55rem"
        // height="100vh"
        p="1rem"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          height="25rem"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          paddingY={2}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <GroupedStackedColumn />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          height="25rem"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          paddingY={2}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <PieChart />
        </Box>
        {loan_types?.results.map((type) => (
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            // gridRow={expanded ? "span 3" : "span 2"}
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.55rem"
            p={2}
            mt="3.5rem"
            height="fit-content"
          >
            <LoanProductCard key={type.id} type={type} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default LoanProducts;
