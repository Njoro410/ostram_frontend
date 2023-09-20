import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import Header from "../../../components/Header";
import CustomTabs from "../../../components/CustomTabs";
import CustomCalc from "./CustomCalc";
import DefinedCalc from "./DefinedCalc";
import CalcResults from "./CalcResults";

const LoanCalculator = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 800px)");
  const [loanData, setLoanData] = useState({
    principalAmount: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    loanTerm: 0,
  });

  const updateLoanData = (data) => {
    setLoanData(data);
  };

  const [activeCalcTab, setActiveCalcTab] = useState(0);

  const handleCalcTabChange = (event, newValue) => {
    setActiveCalcTab(newValue);
  };

  const calcTabs = [
    {
      label: "Defined",
    },
    {
      label: "Custom",
    },
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <Header
        title="LOAN CALCULATOR"
        subtitle="Find the best loan repayment terms for you by entering an amount, interest rate, and borrowing period. All borrowing rates used in this tool are indicative."
      />
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="10px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 4"
          // gridRow="span 2"
          flexDirection="column"
          justifyContent="space-between"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <CustomTabs
            tabs={calcTabs}
            value={activeCalcTab}
            onChange={handleCalcTabChange}
            full
          />
          {activeCalcTab === 0 && <DefinedCalc updateLoanData={updateLoanData} />}
          {activeCalcTab === 1 && (
            <CustomCalc updateLoanData={updateLoanData} />
          )}
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          height="fit-content"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <CalcResults loanData={loanData} />
        </Box>
      </Box>
    </Box>
  );
};

export default LoanCalculator;
