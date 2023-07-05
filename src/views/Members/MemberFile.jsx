import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useGetMemberDetailsQuery } from "../../services/members/memberSlices";
import { useLazyGetMemberLoansQuery } from "../../services/loans/loanSlices";
import { useGetMemberDepositsQuery } from "../../services/deposits/depositSlice";
import { useGetMemberSavingsQuery } from "../../services/savings/savingsSlice";
import { useParams } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { Box, useMediaQuery, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CustomTabs from "../../components/CustomTabs";
import { MemberInfo } from "../../components/MemberComponents/MemberInfo";
import Datagrid, { columnProperties } from "../../components/Datagrid";
import MemberLoans from "../../components/MemberComponents/MemberLoans";
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
  { divider: "true" },
];

const ActionTabs = [{ label: "Update" }, { label: "Delete" }];

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

  // fetch loans
  const [loansData, setLoans] = useState([]);
  const [getMemberLoans, { data: loans }] = useLazyGetMemberLoansQuery();
  useEffect(() => {
    if (loans) {
      getMemberLoans(memberNo);
      setLoans(loans.data);
    }
  }, [loans]);

  // fetch deposits
  const [depositsData, setDeposits] = useState([]);
  const { data: deposits } = useGetMemberDepositsQuery(memberNo);
  useEffect(() => {
    if (deposits) {
      setDeposits(deposits.data);
    }
  }, [deposits]);
  // fetch savings
  const [savingsData, setSavings] = useState([]);
  const { data: savings } = useGetMemberSavingsQuery(memberNo);
  useEffect(() => {
    if (savings) {
      setSavings(savings.data);
    }
  }, [savings]);

  return (
    <Box m="5.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={member?.results?.names?.toUpperCase()}
          subtitle="Member file"
        />
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
            <Divider />
            <p>Action buttons here. Hide on non medium, move to profile card</p>
          </Box>
        )}

        {/* Horizontal Tabs */}
        {!isNonMediumScreens && (
          <Box flexGrow={1}>
            <CustomTabs
              tabs={Tabs}
              value={activeTab}
              onChange={handleTabChange}
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
                {activeTab === 1 && <p>deposits</p>}
                {activeTab === 2 && (
                  <MemberLoans mbr_no={member?.results.mbr_no} />
                )}
                {activeTab === 3 && <p>savings</p>}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
    // <Box m="1.5rem 2.5rem">
    //   <FlexBetween>
    //     <Header
    //       title="MEMBER DETAILS"
    //       subtitle={toTitleCase(member.results.names)}
    //     />
    //   </FlexBetween>
    //   <br />

    //   <CustomTabs tabs={Tabs} value={activeTab} onChange={handleTabChange} />

    //   {activeTab === 0 && (
    //     <Box
    //       mt="20px"
    //       display="grid"
    //       gridTemplateColumns="repeat(12, 1fr)"
    //       gridAutoRows="130px"
    //       gap="20px"
    //       sx={{
    //         "& > div": {
    //           gridColumn: isNonMediumScreens ? undefined : "span 12",
    //         },
    //       }}
    //     >
    //       <MemberInfoCard member={member} />

    //       <StatBox
    //         title="Total loans"
    //         // increase={loans.data.amount}
    //         // description={loans.data.issue_date}
    //         icon={
    //           <PointOfSale
    //             sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
    //           />
    //         }
    //       />

    //       <StatBox
    //         title="Total Savings"
    //         // increase={savings.data.balance}
    //         // description={savings.data.updated_on}
    //         icon={
    //           <PersonAdd
    //             sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
    //           />
    //         }
    //       />
    //       <StatBox
    //         title="Total Deposits"
    //         // increase={deposits.data.updated_on}
    //         // description={deposits.data.balance}
    //         icon={
    //           <Traffic
    //             sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
    //           />
    //         }
    //       />

    //       <StatBox
    //         title="More info"
    //         increase="+43%"
    //         description="Since last month"
    //         icon={
    //           <Traffic
    //             sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
    //           />
    //         }
    //       />

    //       <Box
    //         gridColumn="span 8"
    //         gridRow="span 3"
    //         backgroundColor={theme.palette.background.alt}
    //         p="1rem"
    //         borderRadius="0.55rem"
    //         component="div"
    //         sx={{
    //           justifyContent: "center",
    //           alignItems: "center",
    //           justifyItems: "center",
    //         }}
    //       >
    //         <BarChart series={series} name="Loans, Deposits, Savings" />
    //       </Box>
    //       <NextOfKinBox nextOfKin={member} />
    //     </Box>
    //   )}
    //   {activeTab === 1 && (
    //     <Datagrid
    //       rows={depositsData}
    //       columns={generalColumns}
    //       getRowId={(row) => row.id}
    //       key={depositsData.id}
    //     />
    //   )}

    //   {activeTab === 2 && (
    //     <Datagrid
    //       rows={loansData}
    //       columns={loansColumns}
    //       getRowId={(row) => row.id}
    //       key={loansData.id}
    //     />
    //   )}

    //   {activeTab === 3 && (
    //     <Datagrid
    //       rows={savingsData}
    //       columns={generalColumns}
    //       getRowId={(row) => row.id}
    //       key={savingsData?.id}
    //     />
    //   )}
    // </Box>
  );
};

export default MemberFile;
