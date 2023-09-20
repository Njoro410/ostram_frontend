import React, { useState, useEffect } from "react";
import CustomSpinner from "../CustomSpinner";
import { useGetMemberDepositsQuery } from "../../services/deposits/depositSlice";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import AccountSplineArea from "../../charts/AccountSplineArea";
import Linechart from "../../charts/Linechart";

const MemberDeposits = ({ mbr_no }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // fetch deposits
  const [depositsData, setDeposits] = useState([]);
  const { data: deposits, isLoading } = useGetMemberDepositsQuery(mbr_no);
  useEffect(() => {
    if (deposits) {
      setDeposits(deposits.data);
    }
  }, [deposits]);
  console.log(deposits);
  console.log(deposits?.data.deposits_balance);
  const depositsSeries = [
    {
      name: "Deposits",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  return (
    <Box
    // gridColumn="span 12"
    // gridRow="span 1"
    // display="flex"
    // p="1.25rem 1rem"
    // backgroundColor={theme.palette.background.alt}
    // mb={1.5}
    // sx={{
    //   border: (theme) => `1px solid ${theme.palette.divider}`,
    //   borderRadius: 1,
    // }}
    >
      {/* <p>display loans</p> */}
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <>
          <Box
            // mt="20px"
            display="grid"
            // gridTemplateColumns="repeat(12, 1fr)"
            // gridAutoRows="160px"
            // gap="20px"
            marginLeft={"10px"}
          >
            <Box gridColumn="span 12" borderRadius="0.55rem" height="9rem">
              <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="120px"
                gap="20px"
              >
                <Box
                  gridColumn="span 4"
                  // gridRow="span 1"
                  backgroundColor={theme.palette.background.alt}
                  borderRadius="0.55rem"
                  display="flex"
                  flexDirection="column"
                  sx={{
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "lighter", ml: 3, mt: 3 }}
                    variant="h6"
                  >
                    Total Deposits
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
                    {deposits?.data.deposits_balance}
                  </Typography>
                  <AccountSplineArea />
                </Box>
                <Box
                  gridColumn="span 4"
                  // gridRow="span 2"
                  backgroundColor={theme.palette.background.alt}
                  borderRadius="0.55rem"
                  // height="15rem"
                  display="flex"
                  flexDirection="column"
                  sx={{
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "lighter", ml: 3, mt: 3 }}
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
                  // gridRow="span 2"
                  backgroundColor={theme.palette.background.alt}
                  borderRadius="0.55rem"
                  // height="15rem"
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
                      mt: 3,
                    }}
                    variant="h6"
                  >
                    Average monthly deposit
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
              gridColumn="span 12"
              // gridRow="span 3"
              backgroundColor={theme.palette.background.alt}
              borderRadius="0.55rem"
              height="16rem"
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: "900", m: 3, textAlign: "center" }}
                gutterBottom
              >
                Recent Deposits
              </Typography>
              <Divider variant="middle" />
              <Typography>Something scrollable here?</Typography>
            </Box>

            <Box
              gridColumn="span 12"
              gridRow="span 2"
              mt={"20px"}
              borderRadius="0.55rem"
              height="23rem"
              backgroundColor={theme.palette.background.alt}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Linechart series={depositsSeries} nameText="Deposits" />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MemberDeposits;
