import {
  Avatar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import useUser from "../../hooks/useUser";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import CustomTabs from "../../components/CustomTabs";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  const { user, isLoading, isSuccess, isError, error } = useUser();
  // console.log(user);
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
  ];
  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={user?.results?.fullname?.toUpperCase()}
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
            <Box
              gridColumn="span 12"
              gridRow="span 1"
              display="flex"
              p="1.25rem 1rem"
              backgroundColor={theme.palette.background.alt}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Box mt={1.8}>
                <Avatar
                  alt={user?.results.fullname}
                  src="https://xsgames.co/randomusers/avatar.php?g=male"
                  sx={{ width: 96, height: 96 }}
                />
              </Box>
              <Box m={2.5}>
                <Typography
                  sx={{ fontWeight: "900" }}
                  variant="h6"
                  gutterBottom
                >
                  {user?.results?.title}
                  {user?.results?.fullname}
                </Typography>
                <Typography sx={{}} variant="h6" gutterBottom>
                  {/* {user?.results?.email} */} Operations Manager
                </Typography>
                <Typography sx={{}} variant="h6" gutterBottom>
                  {/* {user?.results?.email} */} Kajiado, Branch
                </Typography>
              </Box>
            </Box>

            <Box
              gridColumn="span 12"
              gridRow="span 2"
              p="1.25rem 1rem"
              backgroundColor={theme.palette.background.alt}
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >

              {activeProfileTab === 0 && <PersonalInformation user={user} />}
              {activeProfileTab === 1 && <UpdateProfile/>}
              {activeProfileTab === 2 && <ChangePassword/>}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
