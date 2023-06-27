import { Box, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import Sparkline from "../../charts/Sparkline";
import Linechart from "../../charts/Linechart";
import SplineArea from "../../charts/SplineArea";

const SavingsAccount = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const Savingseries = [
    {
      name: "Savings",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <Header
        title="SAVING ACCOUNTS"
        subtitle="Comprehensive detail about savings accounts"
      />
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
          borderRadius="0.55rem"
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
                Total Savings Amount This Year
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
              <Typography>Compared to last year</Typography>
            </FlexBetween>
          </Paper>
        </Box>

        <Box
          gridColumn="span 3"
          gridRow="span 1"
          p="1.25rem 1rem"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
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
                Total savings this Month
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
          borderRadius="0.55rem"
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
                Total Savings Withdrawals This Month
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography
                variant="h3"
                fontWeight="600"
                sx={{ color: theme.palette.secondary[200] }}
              >
                78,000
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
          display="grid"
          gridTemplateRows="repeat(12, 1fr)"
          gridColumn="span 3"
          gap="10px"
          sx={{
            "& > div": {
              gridColumn: isNonMediumScreens ? undefined : "span 12",
            },
          }}
        >
          <Box
            gridColumn="span 12"
            gridRow="span 6"
            p="1.25rem 1rem"
            backgroundColor={theme.palette.background.alt}
            borderRadius="0.35rem"
            display='flex'
            flexDirection='column'
            justifyContent='center'
          >
            <FlexBetween gap="1rem">
              <Typography>Saving growth rate last 6 months</Typography>
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: theme.palette.secondary.light }}
              >
                25%
              </Typography>
            </FlexBetween>
          </Box>

          <Box
            gridColumn="span 12"
            gridRow="span 6"
            p="1.25rem 1rem"
            backgroundColor={theme.palette.background.alt}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            borderRadius="0.35rem"
          >
            <FlexBetween gap="1rem">
              <Typography>Average monthly savings</Typography>
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: theme.palette.secondary.light }}
              >
                2,500 KES
              </Typography>
            </FlexBetween>
          </Box>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          // mt="5rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <Linechart series={Savingseries} nameText='Savings to date'/>
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
          borderRadius="0.55rem"
        >
          
          <SplineArea />
        </Box>
      </Box>
    </Box>
  );
};

export default SavingsAccount;
