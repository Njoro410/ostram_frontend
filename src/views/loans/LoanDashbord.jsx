import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import SplineArea from "../../charts/SplineArea";
import Linechart from "../../charts/Linechart";
import FlexBetween from "../../components/FlexBetween";
import Sparkline from "../../charts/Sparkline";
import { useNavigate } from "react-router-dom";

const LoanDashbord = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigateToLoanApplication = () => {
    navigate("/apply loan");
  };
  const Savingseries = [
    {
      name: "Savings",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  return (
    <Box mt="1rem">
      <FlexBetween>
        <Header
          title="LOAN DASHBOARD"
          subtitle="Comprehensive detail about savings accounts"
        />

        <Box>
          <Button
            onClick={navigateToLoanApplication}
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
            Apply Loan
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 3"
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
          <Paper
            elevation={0}
            sx={{
              background: "transparent",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FlexBetween>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary[100] }}
              >
                Total Loans Given This Year
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography
                variant="h3"
                fontWeight="600"
                sx={{ color: theme.palette.secondary[200] }}
              >
                100
              </Typography>
              <Sparkline />
            </FlexBetween>

            <FlexBetween gap="1rem">
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: theme.palette.secondary.light }}
              >
                15% Increase
              </Typography>
              <Typography>Compared to last year</Typography>
            </FlexBetween>
          </Paper>
        </Box>

        <Box
          gridColumn="span 3"
          gridRow="span 1"
          p="1.25rem 1rem"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              background: "transparent",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FlexBetween>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary[100] }}
              >
                Total Loan Amount Disbursed This Year
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography
                variant="h3"
                fontWeight="600"
                sx={{ color: theme.palette.secondary[200] }}
              >
                100,000
              </Typography>
              <Sparkline />
            </FlexBetween>

            <FlexBetween gap="1rem">
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: theme.palette.secondary.light }}
              >
                15% Increase
              </Typography>
              <Typography>Since last month</Typography>
            </FlexBetween>
          </Paper>
        </Box>

        <Box
          gridColumn="span 3"
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
          <Paper
            elevation={0}
            sx={{
              background: "transparent",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FlexBetween>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary[100] }}
              >
                Pending Loan Amount This Yearly
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography
                variant="h3"
                fontWeight="600"
                sx={{ color: theme.palette.secondary[200] }}
              >
                100,000
              </Typography>
              <Sparkline />
            </FlexBetween>

            <FlexBetween gap="1rem">
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: theme.palette.secondary.light }}
              >
                15% Increase
              </Typography>
              <Typography>Since last month</Typography>
            </FlexBetween>
          </Paper>
        </Box>

        <Box
          gridColumn="span 3"
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
          <Paper
            elevation={0}
            sx={{
              background: "transparent",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <FlexBetween>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary[100] }}
              >
                Number of pending loans
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography
                variant="h3"
                fontWeight="600"
                sx={{ color: theme.palette.secondary[200] }}
              >
                5
              </Typography>
              {/* <Sparkline /> */}
            </FlexBetween>

            <FlexBetween gap="1rem">
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: theme.palette.secondary.light }}
              >
                {/* 15% Increase */}
              </Typography>
              {/* <Typography>Since last month</Typography> */}
            </FlexBetween>
          </Paper>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
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
          <Linechart series={Savingseries} nameText="Savings to date" />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
          <SplineArea />
        </Box>
      </Box>
    </Box>
  );
};

export default LoanDashbord;
