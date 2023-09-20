import { Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import CustomTabs from "../../components/CustomTabs";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import UpdateProfile from "./UpdateProfile";
import ManageUsers from "../settings/StaffManagement/ManageUsers";

const Profile = () => {
  const { user, isLoading, isSuccess, isError, error } = useUser();

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const [activeProfileTab, setActiveProfileTab] = useState(0);

  const handleProfileTabChange = (event, newValue) => {
    setActiveProfileTab(newValue);
  };

  const profileTabs = [
    {
      label: "Personal Information",
    },
    {
      label: "Update Profile Information",
    },
    {
      label: "Security",
    },
    // {
    //   label: "Manage Users",
    // },
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={user?.results?.first_name?.toUpperCase()}
          subtitle="Welcome to your profile"
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
          gridRow="span 2"
          flexDirection="column"
          justifyContent="space-between"
          p="1.25rem 1rem"
          flex="1 1 100%"
          height="11.5rem"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <CustomTabs
            tabs={profileTabs}
            value={activeProfileTab}
            onChange={handleProfileTabChange}
            orientation
          />
        </Box>
        <Box
          gridColumn="span 9"
          gridRow="span 3"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="160px"
            gap="10px"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
            <Box gridColumn="span 12">
              {activeProfileTab === 0 && <PersonalInformation user={user} />}
              {activeProfileTab === 1 && <UpdateProfile />}
              {activeProfileTab === 2 && <ChangePassword />}
              {/* {activeProfileTab === 3 && <ManageUsers />} */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
