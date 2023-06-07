import React from "react";
import {
  Typography,
  Box,
  Avatar,
  Button,
  CardContent,
  CardActions,
} from "@mui/material";
import { PointOfSale } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import toTitleCase from "../../utils/titleCaseConverter";
import AlertDialog from "../../components/Dialog";

// Reusable components
export const MemberInfoCard = ({ member }) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 3"
      borderRadius="0.55rem"
      component="card"
      sx={{
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar
            alt={member.results.names}
            src={member.results.image}
            sx={{
              width: 120,
              height: 120,
              marginRight: "10px",
            }}
          />
        </div>
        <div>
          <Typography variant="h4" color="secondary">
            {toTitleCase(member.results.names)}
          </Typography>
          <Typography variant="p">
            {toTitleCase(member.results.gender)}
          </Typography>
        </div>
        <br />
        <hr />
        <Typography color="textSecondary">
          Member Number: {member.results.mbr_no}
        </Typography>
        <Typography color="textSecondary">
          ID Number: {member.results.id_no}
        </Typography>
        <Typography color="textSecondary">
          KRA Pin: {member.results.kra_pin ? member.data.kra_pin : "Null"}
        </Typography>
        <Typography color="textSecondary">
          Phone Number: {member.results.phone_no}
        </Typography>
        <Typography color="textSecondary">
          Residential area: {toTitleCase(member.results.residential)}
        </Typography>
        <Typography color="textSecondary">
          Created by: {member.results.created_by}
        </Typography>
      </CardContent>

      <CardActions>
        <Button variant="contained" sx={{ marginRight: "5px" }}>
          Update
        </Button>
        <AlertDialog
          action="Delete"
          title="You are about to delete this member"
          message="Are you sure you want to delete this user? This action is irreversible"
        />
      </CardActions>
    </Box>
  );
};

const StatBox = ({ title, increase, description, icon }) => {
  const theme = useTheme();

  return (
    <StatBox
      title={title}
      increase={increase}
      description={description}
      icon={
        <PointOfSale
          sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
        />
      }
    />
  );
};

export const NextOfKinBox = ({ nextOfKin }) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 4"
      gridRow="span 1"
      backgroundColor={theme.palette.background.alt}
      p="1.5rem"
      borderRadius="0.55rem"
    >
      <Typography
        variant="h5"
        sx={{
          color: theme.palette.secondary[300],
          marginBottom: "10px",
        }}
      >
        Next of Kin
      </Typography>
      <Typography color="textSecondary">
        Name: {toTitleCase(nextOfKin.results.next_of_kin)}
      </Typography>
      <Typography color="textSecondary">
        Phone number: {nextOfKin.results.phone_nos}
      </Typography>
      <Typography color="textSecondary">
        Relationship: {toTitleCase(nextOfKin.results.relationship)}
      </Typography>
    </Box>
  );
};
