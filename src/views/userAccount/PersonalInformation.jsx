import React from "react";
import FlexBetween from "../../components/FlexBetween";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import ProfileBox from "../../components/ProfileBox";

const PersonalInformation = ({ user }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
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
      <ProfileBox user={user} theme={theme} />
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
        <Typography
          sx={{ fontWeight: "bolder", marginX: 5 }}
          variant="h6"
          gutterBottom
        >
          Personal Information
        </Typography>
        <FlexBetween sx={{ marginX: 5, paddingY: 2 }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="13rem"
          >
            <Box>
              <Typography
                sx={{ fontWeight: "lighter", color: "text.secondary" }}
                variant="h6"
                gutterBottom
              >
                Fullname
              </Typography>
              <Typography
                sx={{ fontWeight: "lighter" }}
                variant="h6"
                gutterBottom
              >
                {user?.results?.fullname}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: "lighter", color: "text.secondary" }}
                variant="h6"
                gutterBottom
              >
                Username
              </Typography>
              <Typography
                sx={{ fontWeight: "lighter" }}
                variant="h6"
                gutterBottom
              >
                {user?.results?.fullname}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: "lighter", color: "text.secondary" }}
                variant="h6"
                gutterBottom
              >
                Email
              </Typography>
              <Typography
                sx={{ fontWeight: "lighter" }}
                variant="h6"
                gutterBottom
              >
                {user?.results?.fullname}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="13rem"
          >
            <Box>
              <Typography
                sx={{ fontWeight: "lighter", color: "text.secondary" }}
                variant="h6"
                gutterBottom
              >
                Phone Number
              </Typography>
              <Typography
                sx={{ fontWeight: "lighter" }}
                variant="h6"
                gutterBottom
              >
                {user?.results?.fullname}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: "lighter", color: "text.secondary" }}
                variant="h6"
                gutterBottom
              >
                Date of Birth
              </Typography>
              <Typography
                sx={{ fontWeight: "lighter" }}
                variant="h6"
                gutterBottom
              >
                {user?.results?.fullname}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: "lighter", color: "text.secondary" }}
                variant="h6"
                gutterBottom
              >
                Joined On
              </Typography>
              <Typography
                sx={{ fontWeight: "lighter" }}
                variant="h6"
                gutterBottom
              >
                {user?.results?.fullname}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            height="13rem"
          >
            <Box>
              <Typography
                sx={{ fontWeight: "lighter", color: "text.secondary" }}
                variant="h6"
                gutterBottom
              >
                Reports To
              </Typography>
              <Typography
                sx={{ fontWeight: "lighter" }}
                variant="h6"
                gutterBottom
              >
                {user?.results?.fullname}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: "lighter", color: "text.secondary" }}
                variant="h6"
                gutterBottom
              >
                Fullname
              </Typography>
              <Typography
                sx={{ fontWeight: "lighter" }}
                variant="h6"
                gutterBottom
              >
                {user?.results?.fullname}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: "lighter", color: "text.secondary" }}
                variant="h6"
                gutterBottom
              >
                Fullname
              </Typography>
              <Typography
                sx={{ fontWeight: "lighter" }}
                variant="h6"
                gutterBottom
              >
                {user?.results?.fullname}
              </Typography>
            </Box>
          </Box>
        </FlexBetween>
      </Box>
    </Box>
  );
};

export default PersonalInformation;
