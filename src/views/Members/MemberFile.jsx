import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useGetMemberDetailsQuery } from "../../services/members/memberSlices";
import { useGetMemberLoansQuery } from "../../services/loans/loanSlices";
import { useGetMemberDepositsQuery } from "../../services/deposits/depositSlice";
import { useGetMemberSavingsQuery } from "../../services/savings/savingsSlice";
import { useParams } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";

import { PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";

import StatBox from "../../components/StatBox";

const MemberFile = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { memberNo } = useParams();

  const {
    data: member,
    isLoading,
    isFetching,
  } = useGetMemberDetailsQuery(memberNo);

  const { data: loans } = useGetMemberLoansQuery(memberNo);
  console.log(loans, "loans");

  const { data: deposits } = useGetMemberDepositsQuery(memberNo);
  console.log(deposits, "deposits");

  const { data: savings } = useGetMemberSavingsQuery(memberNo);
  console.log(savings, "savings");

  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header title="MEMBER DETAILS" subtitle={member.results.names} />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mt:"25px"
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
            member info
          </Typography>
          <Typography variant="h5">
            Full name: {member.results.names}
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
        </Box>
        {/* <StatBox
          title="New Members"
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{
                color: theme.palette.secondary[300],
                fontSize: "26px",
              }}
            />
          }
          sx={{ backgroundColor: theme.palette.secondary[500] }}
        /> */}
        <StatBox
          title="Total loans"
          increase="+21%"
          description="Given this month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />

        <StatBox
          title="Total Savings"
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Deposits"
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        {/* row two */}

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            some graph
          </Typography>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            next of kin
          </Typography>
          <Typography variant="h5" component="h2">
            Name: {member.results.next_of_kin}
          </Typography>
          <Typography>Relationship: {member.results.relationship}</Typography>
          <Typography variant="body2" component="p">
            Phone number:{" "}
            {member.results.phone_nos ? member.results.phone_nos : "Null"}
          </Typography>
        </Box>
      </Box>
    </Box>
    // <Box m="5.5rem 2.5rem">
    //   <Header title="MEMBER DETAILS" subtitle={member.results.names} />
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} md={8}>
    //       <Card
    //         sx={{
    //           bgcolor: "primary.main",
    //           color: "primary.contrastText",
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "space-between",
    //           height: "100%",
    //         }}
    //       >
    //         <CardHeader
    //           avatar={
    //             <Avatar
    //               src={member.results.image}
    //               sx={{ width: 56, height: 56 }}
    //             />
    //           }
    //           title={member.results.names}
    //           subheader={member.results.mbr_no}
    //         />
    //         <CardContent>
    //           <Typography variant="h5" component="h2">
    //             {member.results.names}
    //           </Typography>
    //           <Typography color="textSecondary">
    //             Created by: {member.results.created_by}
    //           </Typography>
    //           <Typography color="textSecondary">
    //             Gender: {member.results.gender}
    //           </Typography>
    //           <Typography color="textSecondary">
    //             ID Number: {member.results.id_no}
    //           </Typography>
    //           <Typography color="textSecondary">
    //             KRA Pin: {member.results.kra_pin ? member.data.kra_pin : "Null"}
    //           </Typography>
    //           <Typography color="textSecondary">
    //             Phone Number: {member.results.phone_no}
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //     <Grid item xs={12} md={4}>
    //       <Card
    //         sx={{
    //           bgcolor: "secondary.main",
    //           color: "secondary.contrastText",
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "space-between",
    //           height: "100%",
    //         }}
    //       >
    //         <CardHeader title="Next of Kin" />
    //         <CardContent>
    //           <Typography variant="h5" component="h2">
    //             Name: {member.results.next_of_kin}
    //           </Typography>
    //           <Typography>
    //             Relationship: {member.results.relationship}
    //           </Typography>
    //           <Typography variant="body2" component="p">
    //             Phone number:{" "}
    //             {member.results.phone_nos ? member.results.phone_nos : "Null"}
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //   </Grid>
    // </Box>
  );
};
export default MemberFile;
