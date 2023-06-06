import React, { useState } from "react";
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
  useMediaQuery,
  Avatar,
  Button,
  CardContent,
  CardActions,
} from "@mui/material";

import { PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import StatBox from "../../components/StatBox";
import MemberChart from "./MemberInfoGraph";
import { useTheme } from "@mui/material/styles";
import toTitleCase from "../../utils/titleCaseConverter";
import AlertDialog from "../../components/Dialog";
import CustomTabs from "../../components/CustomTabs";

const MemberFile = () => {
  const [value, setValue] = React.useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const Tabs = [
    { label: "Member Information" },
    { label: "Deposits" },
    { label: "Loans" },
    { label: "Savings" },
  ];

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

      <CustomTabs tabs={Tabs} value={activeTab} onChange={handleTabChange} />

      {activeTab === 0 && (
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
      )}
      {activeTab === 1 && <p>Deposits</p>}

      {activeTab === 2 && <p>Loans</p>}

      {activeTab === 3 && <p>Savings</p>}
    </Box>
  );
};

export default MemberFile;
