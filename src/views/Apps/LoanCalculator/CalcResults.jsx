import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import formatToKES from "../../../utils/formatToKes";
import PieChart from "../../../charts/PieChart";
import FlexBetween from "../../../components/FlexBetween";

const CalcResults = ({ loanData }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const labels = ["Principal Amount", "Total Interest"];

  const series = [+loanData.principalAmount, +loanData.totalInterest];

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap="5px"
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
      }}
    >
      <Box
        gridColumn="span 6"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        borderRadius="0.55rem"
      >
        <Typography
          variant="h4"
          display="block"
          sx={{
            fontWeight: "light",
            fontSize: "1.5rem",
          }}
        >
          Monthly Payments
        </Typography>
        <Typography
          variant="h4"
          display="block"
          sx={{
            fontWeight: "lighter",
            fontSize: "3rem",
            mt: 1.5,
            color: theme.palette.secondary[300],
          }}
        >
          {formatToKES(loanData.monthlyPayment)}
        </Typography>

        <Typography
          variant="h4"
          display="block"
          sx={{
            fontWeight: "light",
            fontSize: "1rem",
            mt: 1,
          }}
        >
          You will need to pay
          <Box
            component="span"
            sx={{ color: theme.palette.secondary[300], fontWeight: "bold" }}
          >
            {" "}
            {formatToKES(loanData.monthlyPayment)}{" "}
          </Box>
          every month for{" "}
          <Box
            component="span"
            sx={{ color: theme.palette.secondary[300], fontWeight: "bold" }}
          >
            {loanData.loanTerm} months
          </Box>{" "}
          to pay off the loan.
        </Typography>
        <Divider sx={{ py: 1 }} />
        <FlexBetween>
          <Box>
            <Typography
              variant="h4"
              display="block"
              sx={{
                fontWeight: "light",
                fontSize: "1rem",
                mt: 1,
              }}
            >
              Total Payments
            </Typography>

            <Typography
              variant="h4"
              display="block"
              sx={{
                fontSize: "1rem",
                mt: 1,
                color: theme.palette.secondary[300],
                fontWeight: "bold",
              }}
            >
              {formatToKES(loanData.totalPayment)}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h4"
              display="block"
              sx={{
                fontWeight: "light",
                fontSize: "1rem",
                mt: 1,
              }}
            >
              Total Interest
            </Typography>

            <Typography
              variant="h4"
              display="block"
              sx={{
                fontSize: "1rem",
                mt: 1,
                color: theme.palette.secondary[300],
                fontWeight: "bold",
              }}
            >
              {formatToKES(loanData.totalInterest)}
            </Typography>
          </Box>
        </FlexBetween>

        <FlexBetween sx={{ mt: 2 }}>
          <Box>
            <Typography
              variant="h4"
              display="block"
              sx={{
                fontWeight: "light",
                fontSize: "1rem",
                mt: 1,
              }}
            >
              Principal Amount
            </Typography>

            <Typography
              variant="h4"
              display="block"
              sx={{
                fontSize: "1rem",
                mt: 1,
                color: theme.palette.secondary[300],
                fontWeight: "bold",
              }}
            >
              {formatToKES(loanData.principalAmount)}
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h4"
              display="block"
              sx={{
                fontWeight: "light",
                fontSize: "1rem",
                mt: 1,
              }}
            >
              Loan Term
            </Typography>

            <Typography
              variant="h4"
              display="block"
              sx={{
                fontSize: "1rem",
                mt: 1,
                color: theme.palette.secondary[300],
                fontWeight: "bold",
              }}
            >
              {loanData.loanTerm} Months
            </Typography>
          </Box>
        </FlexBetween>
      </Box>
      <Box
        gridColumn="span 6"
        gridRow="span 2"
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        borderRadius="0.55rem"
      >
        <PieChart labels={labels} series={series} height={350} />
      </Box>
    </Box>
  );
};

export default CalcResults;
