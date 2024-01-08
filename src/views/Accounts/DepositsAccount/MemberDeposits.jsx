import { Box, Button, Divider, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../../components/FlexBetween";
import Header from "../../../components/Header";
import { useTheme } from "@emotion/react";
import SplineArea from "../../../charts/SplineArea";
import AccountSparkline from "../../../charts/AccountSplineArea";
import AccountSplineArea from "../../../charts/AccountSplineArea";
import ZoomableTimeseries from "../../../charts/MixedYAxis";
import BarChart from "../../../charts/BarChart";
import MixedYAxis from "../../../charts/MixedYAxis";
import RHFAutoComplete from "../../../components/RHFAutoComplete";
import { useGetMembersQuery } from "../../../services/members/memberSlices";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { individualDeposits } from "../../../utils/validationSchema";
import {
  useLazyGetDepositsHistoryQuery,
  useLazyGetDepositsWithdrawalQuery,
  useLazyGetMemberDepositsQuery,
} from "../../../services/deposits/depositSlice";
import AddDepositsModal from "../../../components/DepositComponents/AddDepositsModal";
import WithdrawDepositsModal from "../../../components/DepositComponents/WithdrawDepositsModal";

const MemberDeposits = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalOpen2 = () => setOpenModal2(true);
  const handleModalClose = () => setOpenModal(false);
  const handleModalClose2 = () => setOpenModal2(false);
  const { data: members, isFetching } = useGetMembersQuery();
  const [getMemberDeposits] = useLazyGetMemberDepositsQuery();
  const [getDepositsHistory] = useLazyGetDepositsHistoryQuery();
  const [getDepositsWithdrawal] = useLazyGetDepositsWithdrawalQuery();
  const [memberId, setMemberId] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [depositsDetails, setDepositsDetails] = useState([]);
  const [depositsHistory, setDepositsHistory] = useState([]);
  const [depositsWithdrawal, setDepositsWithdrawal] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(individualDeposits),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    setMemberId(data.member);
    setTriggerFetch(true);
  };

  useEffect(() => {
    if (triggerFetch) {
      getMemberDeposits(memberId).then((response) => {
        console.log(response.data);
        setDepositsDetails(response.data);
      });
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  useEffect(() => {
    if (triggerFetch) {
      getDepositsHistory(memberId).then((response) => {
        console.log(response.data);
        setDepositsHistory(response.data);
      });
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  useEffect(() => {
    if (triggerFetch) {
      getDepositsWithdrawal(memberId).then((response) => {
        console.log(response.data);
        setDepositsWithdrawal(response.data);
      });
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  const series1 = [
    {
      name: "Amount",
      data: [31, 56],
    },
  ];
  const series2 = [
    {
      name: "Amount",
      data: [31, 4, 28, 51, 42, 109, 100],
    },
  ];
  const series3 = [
    {
      name: "Amount",
      data: [31, 40, 2, 51, 42, 19, 10],
    },
  ];

  return (
    <Box mt="1rem">
      <AddDepositsModal open={openModal} onClose={handleModalClose} />
      <WithdrawDepositsModal open={openModal2} onClose={handleModalClose2} />
      {/* <FlexBetween> */}
      <Box display="flex" justifyContent="space-between">
        <Header
          title="MEMBER SAVINGS"
          subtitle="Comprehensive detail about member savings"
        />

        <Box>
          <Button
            onClick={handleModalOpen}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mb: "25px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
            }}
          >
            Add Deposits
          </Button>
          {/* </Box>

        <Box> */}
          <Button
            onClick={handleModalOpen2}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mb: "25px",
              ml: "10px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
            }}
          >
            Withdraw Deposits
          </Button>
        </Box>
      </Box>
      {/* </FlexBetween> */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        gap="20px"
      >
        {/* <FlexBetween> */}
        <Box gridColumn="span 8">
          <RHFAutoComplete
            options={members?.results || []}
            control={control}
            name="member"
            placeholder="Member Name"
            error={!!errors?.member}
            helperText={errors?.member?.message}
            isFetch={isFetching}
            multiple={false}
          />
        </Box>
        <Box gridColumn="span 4">
          <Button
            type="submit"
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "12px 25px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
            }}
          >
            View Account
          </Button>
        </Box>
      </Box>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        pb="5rem"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box gridColumn="span 8" borderRadius="0.55rem" height="16rem">
          <Box
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
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              borderRadius="0.55rem"
              height="15rem"
              display="flex"
              flexDirection="column"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: "lighter", ml: 3, mt: 5 }}
                variant="h6"
              >
                Total Balance
              </Typography>
              <Typography
                sx={{
                  fontWeight: "1000",
                  ml: 3,
                  mt: 1,
                  color: theme.palette.secondary[400],
                }}
                variant="h2"
              >
                Ksh 24,000
              </Typography>
              <AccountSplineArea series={series1} />
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              borderRadius="0.55rem"
              height="15rem"
              display="flex"
              flexDirection="column"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: "lighter", ml: 3, mt: 5 }}
                variant="h6"
              >
                Total Deposited This Month
              </Typography>
              <Typography
                sx={{
                  fontWeight: "1000",
                  ml: 3,
                  mt: 1,
                  color: theme.palette.secondary[400],
                }}
                variant="h2"
              >
                Ksh 24,000
              </Typography>
              <AccountSplineArea series={series2} />
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              borderRadius="0.55rem"
              height="15rem"
              display="flex"
              flexDirection="column"
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "lighter",
                  ml: 3,
                  mt: 5,
                  color: theme.palette.secondary[400],
                }}
                variant="h6"
              >
                Total Withdrawn This Month
              </Typography>
              <Typography
                sx={{
                  fontWeight: "1000",
                  ml: 3,
                  mt: 1,
                  color: theme.palette.secondary[400],
                }}
                variant="h2"
              >
                Ksh 24,000
              </Typography>
              <AccountSplineArea series={series3} />
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          height="39.2rem"
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "900", m: 3, textAlign: "center" }}
            gutterBottom
          >
            Recent Transactions
          </Typography>
          <Divider variant="middle" />
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          mt={10}
          borderRadius="0.55rem"
          height="23rem"
          backgroundColor={theme.palette.background.alt}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
          }}
        >
          <MixedYAxis />
        </Box>
      </Box>
    </Box>
  );
};

export default MemberDeposits;
