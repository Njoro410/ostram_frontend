import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useGetMemberDetailsQuery } from "../../services/members/memberSlices";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardHeader,
  Avatar,
} from "@mui/material";

const MemberFile = () => {
  const { memberNo } = useParams();

  const {
    data: member,
    isLoading,
    isFetching,
  } = useGetMemberDetailsQuery(memberNo);

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <Box m="5.5rem 2.5rem">
      <Header title="MEMBER DETAILS" subtitle={member.results.names} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={member.results.image}
                  sx={{ width: 56, height: 56 }}
                />
              }
              title={member.results.names}
              subheader={member.results.mbr_no}
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                {member.results.names}
              </Typography>
              <Typography color="textSecondary">
                Created by: {member.results.created_by}
              </Typography>
              <Typography color="textSecondary">
                Gender: {member.results.gender}
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "secondary.main",
              color: "secondary.contrastText",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <CardHeader title="Next of Kin" />
            <CardContent>
              <Typography variant="h5" component="h2">
                Name: {member.results.next_of_kin}
              </Typography>
              <Typography>Relationship: {member.results.relationship}</Typography>
              <Typography variant="body2" component="p">
                Phone number:{" "}
                {member.results.phone_nos ? member.results.phone_nos : "Null"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};


export default MemberFile;



