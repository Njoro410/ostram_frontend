import React, { useState } from "react";
import CustomTabs from "../../../components/CustomTabs";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import SingleSMS from "./SingleSMS";
import BulkSMS from "./BulkSMS";
import Broadcast from "./Broadcast";

const SmsApp = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [activeTodoTab, setActiveTodoTab] = useState(0);

  const handleTodoTabChange = (event, newValue) => {
    setActiveTodoTab(newValue);
  };

  const todoTabs = [
    {
      label: "Send single SMS",
    },
    {
      label: "Send Multiple SMS",
    },
    {
      label: "Broadcast",
    },
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="SEND SMS"
          subtitle="Engage and connect with members effortlessly!"
        />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        // gridAutoRows="160px"
        gap="10px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
          color: theme.palette.secondary[200]
        }}
      >
        <Box
          gridColumn="span 2"
          gridRow="span 2"
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
          <CustomTabs
            tabs={todoTabs}
            value={activeTodoTab}
            onChange={handleTodoTabChange}
            orientation
          />
        </Box>
        <Box
          gridColumn="span 10"
          height="fit-content"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {activeTodoTab === 0 && <SingleSMS />}
          {activeTodoTab === 1 && <BulkSMS />}
          {activeTodoTab === 2 && <Broadcast />}
        </Box>
      </Box>
    </Box>
  );
};

export default SmsApp;
