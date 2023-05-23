import React, { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "../../components/StatBox";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useGetUserQuery } from "../../features/users/usersApiSlice";
import useUser from "../../hooks/useUser";
import Linechart from "../../charts/Linechart";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [activeTab, setActiveTab] = useState(0);

  const { user, isLoading, isSuccess, isError, error } = useUser();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const Savingseries = [
    {
      name: "Savings",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];

  const Depositseries = [
    {
      name: "Deposits",
      data: [100, 40, 95, 75, 99, 652, 79, 981, 14],
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="DASHBOARD"
          subtitle={`Welcome ${user?.results.fullname}`}
        />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mt:"25px"
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
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
        {/* ROW 1 */}
        <StatBox
          title="New Members"
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total loans"
          increase="+21%"
          description="Given this month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Total Savings"
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Deposits"
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            weather forecast
          </Typography>
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Savings"  />
            <Tab label="Deposits" />
          </Tabs>

          {activeTab === 0 && <Linechart series={Savingseries} nameText='Savings to date'/>}

          {activeTab === 1 && <Linechart series={Depositseries} nameText='Deposits to date'/>}
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            more stuff
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
