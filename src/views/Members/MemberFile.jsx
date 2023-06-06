import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useGetMemberDetailsQuery } from "../../services/members/memberSlices";
import { useGetMemberLoansQuery } from "../../services/loans/loanSlices";
import { useGetMemberDepositsQuery } from "../../services/deposits/depositSlice";
import { useGetMemberSavingsQuery } from "../../services/savings/savingsSlice";
import { useParams } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import {
  Typography,
  Box,
  // useTheme,
  useMediaQuery,
  Avatar,
  Button,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import { PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import StatBox from "../../components/StatBox";
import MemberChart from "./MemberInfoGraph";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import toTitleCase from "../../utils/titleCaseConverter";
import AlertDialog from "../../components/Dialog";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const MemberFile = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { memberNo } = useParams();

  // fetch member
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

  // TODO:style this
  if (isLoading || isFetching) return <div>Loading...</div>;

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="MEMBER DETAILS"
          subtitle={toTitleCase(member.results.names)}
        />
      </FlexBetween>
      <br />

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="member information tabs"
      >
        <Tab label="Member Information" {...a11yProps(0)} />
        <Tab label="Loans" {...a11yProps(1)} />
        <Tab label="Savings" {...a11yProps(2)} />
        <Tab label="Deposits" {...a11yProps(3)} />
      </Tabs>

      <Tabs
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="130px"
            gap="20px"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
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
                  KRA Pin:{" "}
                  {member.results.kra_pin ? member.data.kra_pin : "Null"}
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

            <StatBox
              title="More info"
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
              gridRow="span 3"
              backgroundColor={theme.palette.background.alt}
              p="1rem"
              borderRadius="0.55rem"
              component="div"
              sx={{
                justifyContent: "center",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <MemberChart />
            </Box>
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
                Name: {toTitleCase(member.results.next_of_kin)}
              </Typography>
              <Typography color="textSecondary">
                Phone number: {member.results.phone_nos}
              </Typography>
              <Typography color="textSecondary">
                Relationship: {toTitleCase(member.results.relationship)}
              </Typography>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel>
      </Tabs>
    </Box>

    // <Box m="5.5rem 2.5rem">
    //   <FlexBetween>
    //     <Header title="MEMBER DETAILS" subtitle={member.results.names} />
    //   </FlexBetween>
    //   <Tabs value={value} onChange={handleChange}>
    //     <Tab label="Member information" />
    //     <Tab label="Member loans" />
    //     <Tab label="Member savings" />
    //     <Tab label="Member deposits" />
    //   </Tabs>
    //   <Box
    //     mt="20px"
    //     display="grid"
    //     gridTemplateColumns="repeat(12, 1fr)"
    //     gridAutoRows="160px"
    //     gap="20px"
    //     sx={{
    //       "& > div": {
    //         gridColumn: isNonMediumScreens ? undefined : "span 12",
    //       },
    //     }}
    //   >
    //     {/* ROW 1 */}
    //     <Box
    //       gridColumn="span 4"
    //       gridRow="span 2"
    //       backgroundColor={theme.palette.background.alt}
    //       p="1rem"
    //       borderRadius="0.55rem"
    //     >
    //       <Typography variant="h5" sx={{ color: theme.palette.secondary[100] }}>
    //         member info
    //       </Typography>
    //       <Typography variant="h5">
    //         Full name: {member.results.names}
    //       </Typography>
    //       <Typography color="textSecondary">
    //         Created by: {member.results.created_by}
    //       </Typography>
    //       <Typography color="textSecondary">
    //         Gender: {member.results.gender}
    //       </Typography>
    //       <Typography color="textSecondary">
    //         ID Number: {member.results.id_no}
    //       </Typography>
    //       <Typography color="textSecondary">
    //         KRA Pin: {member.results.kra_pin ? member.data.kra_pin : "Null"}
    //       </Typography>
    //       <Typography color="textSecondary">
    //         Phone Number: {member.results.phone_no}
    //       </Typography>
    //       <Avatar
    //         alt={member.results.names}
    //         src={member.results.image}
    //         sx={{ width: 100, height: 100 }}
    //       />
    //     </Box>

    //     <StatBox
    //       title="Total loans"
    //       increase="+21%"
    //       description="Given this month"
    //       icon={
    //         <PointOfSale
    //           sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
    //         />
    //       }
    //     />

    //     <StatBox
    //       title="Total Savings"
    //       increase="+5%"
    //       description="Since last month"
    //       icon={
    //         <PersonAdd
    //           sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
    //         />
    //       }
    //     />
    //     <StatBox
    //       title="Total Deposits"
    //       increase="+43%"
    //       description="Since last month"
    //       icon={
    //         <Traffic
    //           sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
    //         />
    //       }
    //     />
    //     {/* row two */}

    //     <Box
    //       gridColumn="span 8"
    //       gridRow="span 2"
    //       backgroundColor={theme.palette.background.alt}
    //       p="1rem"
    //       borderRadius="0.55rem"
    //     >
    //       <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
    //         some graph
    //       </Typography>
    //       <MemberChart />
    //     </Box>
    //     <Box
    //       gridColumn="span 4"
    //       gridRow="span 1"
    //       backgroundColor={theme.palette.background.alt}
    //       p="1.5rem"
    //       borderRadius="0.55rem"
    //     >
    //       <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
    //         next of kin
    //       </Typography>
    //       <Typography variant="h5" component="h2">
    //         Name: {member.results.next_of_kin}
    //       </Typography>
    //       <Typography>Relationship: {member.results.relationship}</Typography>
    //       <Typography variant="body2" component="p">
    //         Phone number:{" "}
    //         {member.results.phone_nos ? member.results.phone_nos : "Null"}
    //       </Typography>
    //     </Box>
    //   </Box>
    // </Box>
  );
};
export default MemberFile;
