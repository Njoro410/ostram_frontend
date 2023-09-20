import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import { useTheme } from "@emotion/react";
import SplineArea from "../../../charts/SplineArea";
import AccountSparkline from "../../../charts/AccountSplineArea";
import AccountSplineArea from "../../../charts/AccountSplineArea";
import ZoomableTimeseries from "../../../charts/MixedYAxis";
import BarChart from "../../../charts/BarChart";
import MixedYAxis from "../../../charts/MixedYAxis";
import RHFAutoComplete from "../../../components/RHFAutoComplete";

const MemberDeposits = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box mt="1rem">
      <FlexBetween>
        <Header
          title="MEMBER SAVINGS"
          subtitle="Comprehensive detail about member savings"
        />

        <RHFAutoComplete
          options={members?.results || []}
          control={control}
          name="member"
          placeholder="Applicants Name"
          error={!!errors?.member}
          helperText={errors.member?.message}
          isFetch={isFetching}
          multiple={false}
        />

        <Box>
          <Button
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
        pb="5rem"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box gridColumn="span 8" borderRadius="0.55rem" height="16rem">
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="160px"
            gap="20px"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              borderRadius="0.55rem"
              height="15rem"
              display="flex"
              flexDirection="column"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: "lighter", ml: 3, mt: 5 }}
                variant="h6"
              >
                Total Balance
              </Typography>
              <Typography
                sx={{
                  fontWeight: "1000",
                  ml: 3,
                  mt: 1,
                  color: theme.palette.secondary[400],
                }}
                variant="h2"
              >
                Ksh 24,000
              </Typography>
              <AccountSplineArea />
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              borderRadius="0.55rem"
              height="15rem"
              display="flex"
              flexDirection="column"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: "lighter", ml: 3, mt: 5 }}
                variant="h6"
              >
                Total Deposited This Month
              </Typography>
              <Typography
                sx={{
                  fontWeight: "1000",
                  ml: 3,
                  mt: 1,
                  color: theme.palette.secondary[400],
                }}
                variant="h2"
              >
                Ksh 24,000
              </Typography>
              <AccountSplineArea />
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              borderRadius="0.55rem"
              height="15rem"
              display="flex"
              flexDirection="column"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "lighter",
                  ml: 3,
                  mt: 5,
                  color: theme.palette.secondary[400],
                }}
                variant="h6"
              >
                Total Withdrawn This Month
              </Typography>
              <Typography
                sx={{
                  fontWeight: "1000",
                  ml: 3,
                  mt: 1,
                  color: theme.palette.secondary[400],
                }}
                variant="h2"
              >
                Ksh 24,000
              </Typography>
              <AccountSplineArea />
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          height="39.2rem"
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "900", m: 3, textAlign: "center" }}
            gutterBottom
          >
            Recent Transactions
          </Typography>
          <Divider variant="middle" />
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          mt={10}
          borderRadius="0.55rem"
          height="23rem"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <MixedYAxis />
        </Box>
      </Box>
    </Box>
  );
};

export default MemberDeposits;
