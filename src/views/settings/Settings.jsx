import {
  Avatar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import CustomTabs from "../../components/CustomTabs";
import AddNewUser from "./AddNewUser";

const Settings = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [activeSettingsTab, setActiveSettingsTab] = useState(0);

  const handleSettingsTabChange = (event, newValue) => {
    setActiveSettingsTab(newValue);
  };

  const settingsTabs = [
    {
      label: "Add New User",
    },
    {
      label: "Add Loan Document Type",
    },
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="SETTINGS"
          subtitle="Change some fields and alter other settings"
        />
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="10px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 3"
          gridRow="span 3"
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
          <CustomTabs
            tabs={settingsTabs}
            value={activeSettingsTab}
            onChange={handleSettingsTabChange}
            orientation
          />
        </Box>
        <Box
          gridColumn="span 9"
          gridRow="span 3"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          {activeSettingsTab === 0 && <AddNewUser />}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
