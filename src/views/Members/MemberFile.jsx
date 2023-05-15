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
      <Header title="MEMBER DETAILS" subtitle={member.data.names} />
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
                  src={member.data.image}
                  sx={{ width: 56, height: 56 }}
                />
              }
              title={member.data.names}
              subheader={member.data.mbr_no}
            />
            <CardContent>
              <Typography variant="h5" component="h2">
                {member.data.names}
              </Typography>
              <Typography color="textSecondary">
                Created by: {member.data.created_by}
              </Typography>
              <Typography color="textSecondary">
                Gender: {member.data.gender}
              </Typography>
              <Typography color="textSecondary">
                ID Number: {member.data.id_no}
              </Typography>
              <Typography color="textSecondary">
                KRA Pin: {member.data.kra_pin ? member.data.kra_pin : "Null"}
              </Typography>
              <Typography color="textSecondary">
                Phone Number: {member.data.phone_no}
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
                Name: {member.data.next_of_kin}
              </Typography>
              <Typography>Relationship: {member.data.relationship}</Typography>
              <Typography variant="body2" component="p">
                Phone number:{" "}
                {member.data.phone_nos ? member.data.phone_nos : "Null"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};


export default MemberFile;



