import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { useGetMemberDetailsQuery } from "../../services/members/memberSlices";
import { useGetMemberLoansQuery } from "../../services/loans/loanSlices";
import { useGetMemberDepositsQuery } from "../../services/deposits/depositSlice";
import { useGetMemberSavingsQuery } from "../../services/savings/savingsSlice";
import { useParams } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { Box, useMediaQuery } from "@mui/material";
import { PointOfSale, PersonAdd, Traffic } from "@mui/icons-material";
import StatBox from "../../components/StatBox";
import MemberChart from "./MemberInfoGraph";
import { useTheme } from "@mui/material/styles";
import toTitleCase from "../../utils/titleCaseConverter";
import CustomTabs from "../../components/CustomTabs";
import { MemberInfoCard, NextOfKinBox } from "./MemberCard";
import Datagrid from "../../components/Datagrid";

const loansColumns = [
  { field: "amount", headerName: "Amount" },
  { field: "application_date", headerName: "Application date" },
  { field: "issue_date", headerName: "Issue date" },
  { field: "payment_frequency", headerName: "Payment frequency" },
  { field: "loan_type", headerName: "Type" },
  { field: "status", headerName: "Status" },
];

const generalColumns = [
  { field: "balance", headerName: "Balance" },
  { field: "created_on", headerName: "Created" },
  { field: "created_by", headerName: "Created By" },
  { field: "updated_on", headerName: "Updated" },
  { field: "updated_by", headerName: "Updated By" },
  { field: "branch", headerName: "Branch" },
];
const MemberFile = () => {
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
  const { data: member } = useGetMemberDetailsQuery(memberNo);
  // fetch loans
  const [loansData, setLoans] = useState([]);
  const { data: loans } = useGetMemberLoansQuery(memberNo);
  useEffect(() => {
    if (loans) {
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
  }, [loans]);
  // fetch savings
  const [savingsData, setSavings] = useState([]);
  const { data: savings } = useGetMemberSavingsQuery(memberNo);
  useEffect(() => {
    if (savings) {
      setSavings(savings.data);
    }
  }, [savings]);
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
          <MemberInfoCard member={member} />

          <StatBox
            title="Total loans"
            increase={loans.data.amount}
            description={loans.data.issue_date}
            icon={
              <PointOfSale
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />

          <StatBox
            title="Total Savings"
            increase={savings.data.balance}
            description={savings.data.updated_on}
            icon={
              <PersonAdd
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
            }
          />
          <StatBox
            title="Total Deposits"
            increase={deposits.data.updated_on}
            description={deposits.data.balance}
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
          <NextOfKinBox nextOfKin={member} />
        </Box>
      )}
      {activeTab === 1 && (
        <Datagrid
          rows={depositsData}
          columns={generalColumns}
          getRowId={(row) => row.id}
          key={depositsData.id}
        />
      )}

      {activeTab === 2 && (
        <Datagrid
          rows={loansData}
          columns={loansColumns}
          getRowId={(row) => row.id}
          key={loansData.id}
        />
      )}

      {activeTab === 3 && (
        <Datagrid
          rows={savingsData}
          columns={generalColumns}
          getRowId={(row) => row.id}
          key={savingsData.id}
        />
      )}
    </Box>
  );
};

export default MemberFile;
