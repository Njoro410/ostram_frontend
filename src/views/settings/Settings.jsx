import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import CustomTabs from "../../components/CustomTabs";
import AddNewUser from "./AddNewUser";
import Residential from "./Residential";

import ManageUsers from "./StaffManagement/ManageUsers";
import ManageBranches from "./BranchManagement/ManageBranches";

const Settings = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [activeSettingsTab, setActiveSettingsTab] = useState(0);
  const [activeManageBranchTab, setActiveManageBranchTab] = useState(0);
  const [activeManageStaffTab, setActiveManageStaffTab] = useState(0);

  const handleSettingsTabChange = (event, newValue) => {
    setActiveSettingsTab(newValue);
  };

  const handleManageBranchTabChange = (event, newValue) => {
    setActiveManageBranchTab(newValue);
  };

  const handleManageStaffTabChange = (event, newValue) => {
    setActiveManageStaffTab(newValue);
  };

  const branchTabs = [
    {
      label: "All Branches",
    },
    {
      label: "View Branch",
    },
    {
      label: "Add Branch",
    },
    {
      label: "Edit Branch Details",
    },
  ];

  const staffTabs = [
    {
      label: "All Staff",
    },
    {
      label: "View Staff",
    },
    {
      label: "Add Staff",
    },
    {
      label: "Edit Staff Details",
    },
    {
      label: "Permission Groups",
    },
  ];

  const settingsTabs = [
    {
      label: "Manage Staff",
    },
    {
      label: "Manage Branches",
    },
    {
      label: "Add Loan Document Type",
    },
    // { label: "Update Residential Areas" },
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="SETTINGS"
          subtitle="Change some fields and alter other settings"
        />

        <CustomTabs
          tabs={
            activeSettingsTab === 0
              ? staffTabs
              : activeSettingsTab === 1
              ? branchTabs
              : null
          }
          value={
            activeSettingsTab === 0
              ? activeManageStaffTab
              : activeSettingsTab === 1
              ? activeManageBranchTab
              : null
          }
          onChange={
            activeSettingsTab === 0
              ? handleManageStaffTabChange
              : activeSettingsTab === 1
              ? handleManageBranchTabChange
              : null
          }
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
          height="11.5rem"
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
          height="35rem"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {activeSettingsTab === 0 && (
            <ManageUsers activeManageStaffTab={activeManageStaffTab} />
          )}
          {activeSettingsTab === 1 && (
            <ManageBranches activeManageBranchTab={activeManageBranchTab} />
          )}
          {/* {activeSettingsTab === 2 && <Residential />} */}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
