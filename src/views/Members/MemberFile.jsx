import React, { useState } from "react";
import Header from "../../components/Header";
import { useGetMemberDetailsQuery } from "../../services/members/memberSlices";
import { useDeleteMemberMutation } from "../../services/members/memberSlices";
import { useParams, Link } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { Box, useMediaQuery, Divider, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomTabs from "../../components/CustomTabs";
import { MemberInfo } from "../../components/MemberComponents/MemberInfo";
import { columnProperties } from "../../components/Datagrid";
import MemberLoans from "../../components/MemberComponents/MemberLoans";
import MemberDeposits from "../../components/MemberComponents/MemberDeposits";
import MemberSavings from "../../components/MemberComponents/MemberSavings";
import CustomSpinner from "../../components/CustomSpinner";

const loansColumns = [
  { field: "amount", headerName: "Amount", ...columnProperties, minWidth: 100 },
  {
    field: "application_date",
    headerName: "Application date",
    valueGetter: (params) => formatDate(params.row.application_date),
    flex: 1,
    minWidth: 100,
  },
  {
    field: "issue_date",
    headerName: "Issue date",
    valueGetter: (params) => formatDate(params.row.issue_date),
    flex: 1,
    minWidth: 100,
  },
  {
    field: "payment_frequency",
    headerName: "Payment frequency",
    ...columnProperties,
    minWidth: 100,
  },
  {
    field: "loan_type",
    headerName: "Type",
    ...columnProperties,
    minWidth: 100,
  },
  { field: "status", headerName: "Status", ...columnProperties, minWidth: 100 },
];

const generalColumns = [
  {
    field: "balance",
    headerName: "Balance",
    ...columnProperties,
    minWidth: 100,
  },
  {
    field: "created_on",
    headerName: "Created",
    valueGetter: (params) => formatDate(params.row.created_on),
    flex: 1,
    minWidth: 100,
  },
  {
    field: "created_by",
    headerName: "Created By",
    ...columnProperties,
    minWidth: 100,
  },
  {
    field: "updated_on",
    headerName: "Updated",
    valueGetter: (params) => formatDate(params.row.updated_on),
    flex: 1,
    minWidth: 100,
  },
  {
    field: "updated_by",
    headerName: "Updated By",
    ...columnProperties,
    minWidth: 100,
  },
  { field: "branch", headerName: "Branch", ...columnProperties, minWidth: 100 },
];

const Tabs = [
  { label: "Member Information" },
  { label: "Deposits" },
  { label: "Loans" },
  { label: "Savings" },
  {label:'Transactions'},
];

const MemberFile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { memberNo } = useParams();

  // fetch member
  const { data: member, isLoading } = useGetMemberDetailsQuery(memberNo);


  // delete
  const [deleteMember, { isLoading: isDeleting }] = useDeleteMemberMutation();
  const handleDeleteMember = async (memberNo) => {
    try {
      await deleteMember(memberNo).unwrap();
      // Handle success or display toast message
    } catch (error) {
      // Handle error or display toast message
    }
  };

  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={member?.results?.names?.toUpperCase()}
          subtitle="Member file"
        />
        <Box>
          <FlexBetween>
            <Link
              to={`/member-update/${memberNo}`}
              state={{ member: member?.results }}
            >
              <Button variant="outlined" color="secondary">
                Update
              </Button>
            </Link>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteMember(memberNo)}
              disabled={isDeleting}
              startIcon={isDeleting ? <CustomSpinner size={20} /> : null}
            >
              Delete
            </Button>
          </FlexBetween>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        // gridAutoRows="160px"
        gap="10px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* Vertical Tabs */}
        {isNonMediumScreens && (
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
              tabs={Tabs}
              value={activeTab}
              onChange={handleTabChange}
              orientation
            />
          </Box>
        )}

        {/* Horizontal Tabs */}
        {!isNonMediumScreens && (
          <Box flexGrow={1}>
            <CustomTabs
              tabs={Tabs}
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
            />
          </Box>
        )}
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
            {" "}
            {isLoading ? (
              <CustomSpinner />
            ) : (
              <Box gridColumn="span 12">
                {activeTab === 0 && <MemberInfo member={member} />}
                {activeTab === 1 && (
                  <MemberDeposits mbr_no={member?.results.mbr_no} />
                )}
                {activeTab === 2 && (
                  <MemberLoans mbr_no={member?.results.mbr_no} />
                )}
                {activeTab === 3 && (
                  <MemberSavings mbr_no={member?.results.mbr_no} />
                )}
                {activeTab === 4 && (
                  <MemberSavings mbr_no={member?.results.mbr_no} />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MemberFile;
