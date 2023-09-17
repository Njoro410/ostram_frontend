import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import FlexBetween from "../FlexBetween";
import { useTheme } from "@mui/material/styles";
import toTitleCase from "../../utils/titleCaseConverter";

const InfoBox = ({ title, value }) => {
  return (
    <Box mb={1} mx={5}>
      <Typography
        sx={{ fontWeight: "lighter", color: "text.secondary" }}
        variant="h6"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography sx={{ fontWeight: "lighter" }} variant="h6" gutterBottom>
        {value}
      </Typography>
    </Box>
  );
};

export const MemberInfo = ({ member }) => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        gridColumn="span 12"
        gridRow="span 1"
        display="flex"
        p="1.25rem 1rem"
        backgroundColor={theme.palette.background.alt}
        mb={1.5}
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
        }}
      >
        <Box>
          <Avatar
            alt={member?.results.names}
            src={member?.results.image}
            sx={{ width: 96, height: 96 }}
          />
        </Box>
        <Box m={2.5}>
          <Typography sx={{ fontWeight: "900" }} variant="h6" gutterBottom>
            {member?.results?.names}
          </Typography>
          <Typography sx={{}} variant="h6" gutterBottom>
            {member?.results?.mbr_no}
          </Typography>
        </Box>
      </Box>
      <Box
        gridColumn="span 12"
        gridRow="span 1"
        p="1.25rem 1rem"
        backgroundColor={theme.palette.background.alt}
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
        }}
        mb={1.5}
      >
        <Typography
          sx={{ fontWeight: "bolder", marginX: 5 }}
          variant="h6"
          gutterBottom
        >
          Personal Information
        </Typography>
        <FlexBetween>
          <InfoBox
            title="Fullname"
            value={toTitleCase(member?.results.names)}
          />
          <InfoBox title="National ID" value={member?.results.id_no} />
        </FlexBetween>
        <FlexBetween>
          <InfoBox
            title="KRA Pin"
            value={member?.results.kra_pin ? kra_pin : "null"}
          />
        </FlexBetween>
      </Box>
      <Box
        gridColumn="span 12"
        gridRow="span 1"
        p="1.25rem 1rem"
        backgroundColor={theme.palette.background.alt}
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
        }}
        mb={1.5}
      >
        <Typography
          sx={{ fontWeight: "bolder", marginX: 5 }}
          variant="h6"
          gutterBottom
        >
          Contact Details
        </Typography>
        <FlexBetween>
          <InfoBox title="Phone number" value={member?.results.phone_no} />
          <InfoBox title="Residential area" value={member?.results.residential} />
        </FlexBetween>
      </Box>
      <Box
        gridColumn="span 12"
        gridRow="span 1"
        p="1.25rem 1rem"
        backgroundColor={theme.palette.background.alt}
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
        }}
        mb={1.5}
      >
        <Typography
          sx={{ fontWeight: "bolder", marginX: 5 }}
          variant="h6"
          gutterBottom
        >
          Next of kin
        </Typography>
        <FlexBetween>
          <InfoBox title="Name" value={member?.results.next_of_kin} />
          <InfoBox title="Relationship" value={member?.results.relationship} />
        </FlexBetween>
        <FlexBetween>
          <InfoBox title="National ID" value={member?.results.phone_nos} />
        </FlexBetween>
      </Box>
    </Box>
  );
};
