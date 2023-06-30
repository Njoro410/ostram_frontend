import React from "react";
import FlexBetween from "../../components/FlexBetween";
import { Box, Typography } from "@mui/material";

const PersonalInformation = ({ user }) => {
  return (
    <Box>
      {" "}
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
  );
};

export default PersonalInformation;
