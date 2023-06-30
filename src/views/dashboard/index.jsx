import React, { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
  SavingsOutlined,
  AccountBalanceWalletOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Alert,
  AlertTitle,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "../../components/StatBox";
import { Scrollbars } from "react-custom-scrollbars-2";
import useUser from "../../hooks/useUser";
import Linechart from "../../charts/Linechart";
import WeatherData from "../../components/WeatherData";
import CustomTabs from "../../components/CustomTabs";
import { useGetResidentialQuery } from "../../services/members/memberSlices";
import styled from "@emotion/styled";
import jwt_decode from "jwt-decode";

const PulsatingAlert = styled(Alert)`
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [activeGraphTab, setActiveGraphTab] = useState(0);
  const [activeWeatherTab, setActiveWeatherTab] = useState(0);

  const { user, isLoading, isSuccess, isError, error } = useUser();
  const {
    data: areas,
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetResidentialQuery({ skip: true });

  const handleGraphTabChange = (event, newValue) => {
    setActiveGraphTab(newValue);
  };
  const handleWeatherTabChange = (event, newValue) => {
    setActiveWeatherTab(newValue);
  };

  const graphTabs = [{ label: "Savings" }, { label: "Deposits" }];
  const weatherTabs = areas?.results.map((area) => ({ label: area.name }));
  const locations = areas?.results.map(
    (area) => `${area.latitude},${area.longitude}`
  );

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
    <Box m="5.5rem 2.5rem">
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
      {/* <PulsatingAlert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        This webapp is <strong>still in development</strong>, functionality is
        limited. You might see duplicate information
      </PulsatingAlert> */}
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
          value="18"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total loans"
          increase="+21%"
          description="Given this month"
          value="147"
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
          value="100,000"
          icon={
            <SavingsOutlined 
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Deposits"
          increase="+43%"
          description="Since last month"
          value="98,000"
          icon={
            <AccountBalanceWalletOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <CustomTabs
            tabs={weatherTabs}
            value={activeWeatherTab}
            onChange={handleWeatherTabChange}
          />

          {activeWeatherTab === 0 && <WeatherData location={locations?.[0]} />}
          {activeWeatherTab === 1 && <WeatherData location={locations?.[1]} />}
          {activeWeatherTab === 2 && <WeatherData location={locations?.[2]} />}
          {activeWeatherTab === 3 && <WeatherData location={locations?.[3]} />}
          {activeWeatherTab === 4 && <WeatherData location={locations?.[4]} />}
          {activeWeatherTab === 5 && <WeatherData location={locations?.[5]} />}
          {activeWeatherTab === 6 && <WeatherData location={locations?.[6]} />}
          {activeWeatherTab === 7 && <WeatherData location={locations?.[7]} />}
          {activeWeatherTab === 8 && <WeatherData location={locations?.[8]} />}
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <CustomTabs
            tabs={graphTabs}
            value={activeGraphTab}
            onChange={handleGraphTabChange}
          />

          {activeGraphTab === 0 && (
            <Linechart series={Savingseries} nameText="Savings to date" />
          )}

          {activeGraphTab === 1 && (
            <Linechart series={Depositseries} nameText="Deposits to date" />
          )}
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Recent Transactions
            <Divider />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
