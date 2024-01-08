import {
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
  Card,
  CardHeader,
  Chip,
  Divider,
  CardContent,
  CardActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { processMemberIdSchema } from "../../utils/validationSchema";
import RHFAutoComplete from "../../components/RHFAutoComplete";
import {
  useLazyGetMemberLoansQuery,
  useLazyGetLoanByIdQuery,
  useLazyGetLoanInstallmentsByIdQuery,
} from "../../services/loans/loanSlices";
import { useGetMembersQuery } from "../../services/members/memberSlices";
import toTitleCase from "../../utils/titleCaseConverter";
import styled from "@emotion/styled";
import formatDate from "../../utils/formatDate";
import InstallmentsCard from "../../components/LoanComponents/InstallmentsCard";
import PayLoanModal from "../../components/LoanComponents/PayLoanModal";
import LoanDetailsTable from "../../components/LoanComponents/LoanDetailsTable";
import formatToKes from "../../utils/formatToKes";
import CustomLinearProgress from "../../components/CustomLinearProgress";

const GlassCard = styled(Card)`
  background-color: rgba(87, 86, 86, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 10px;
  /* width:20rem */
`;

const StyledCardHeader = styled(CardHeader)`
  .MuiCardHeader-title {
    color: #f3f3f3;
    font-weight: bold;
  }
`;

const StyledChip = styled(Chip)`
  font-weight: bold;
  font-size: 0.85rem;
`;

const ViewLoan = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [memberId, setMemberId] = useState();
  const [memberLoans, setMemberLoans] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loanId, setLoanId] = useState(null);
  const [installmentss, setInstallmentss] = useState(null);
  const { data: members, isFetching } = useGetMembersQuery();
  const [getLoanInstallmentsById] = useLazyGetLoanInstallmentsByIdQuery();
  const [getMemberLoans, { isLoading }] = useLazyGetMemberLoansQuery();
  const [getLoanById, { isLoading: isLoanLoading }] = useLazyGetLoanByIdQuery();

  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(processMemberIdSchema),
  });

  const onSubmitHandler = (data, e) => {
    e.preventDefault();
    setMemberId(data.member);
    setTriggerFetch(true);
  };

  const handleRowClick = (loan_Id) => {
    setLoanId(loan_Id);
  };

  console.log(isLoanLoading);

  useEffect(() => {
    if (loanId) {
      Promise.all([getLoanById(loanId), getLoanInstallmentsById(loanId)])
        .then(([loanResponse, installmentResponse]) => {
          setSelectedRow(loanResponse.data?.results);
          setInstallmentss(installmentResponse.data);
        })
        .catch((error) => console.log(error));
    }
  }, [loanId]);

  useEffect(() => {
    if (triggerFetch) {
      getMemberLoans(memberId).then((response) => {
        setMemberLoans(response.data);
      });
      setTriggerFetch(false);
    }
  }, [triggerFetch]);

  return (
    <Box mt="1rem">
      <PayLoanModal open={openModal} onClose={handleModalClose} />
      <FlexBetween>
        <Header title="VIEW LOAN" subtitle="View specific loan details" />

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
            Pay Loan
          </Button>
        </Box>
      </FlexBetween>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        borderRadius="0.55rem"
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        p="1rem"
        mt="1rem"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box gridColumn="span 8" borderRadius="0.55rem">
          <Box
            gridTemplateColumns="repeat(12, 1fr)"
            display="grid"
            borderRadius="0.55rem"
            paddingRight={1}
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
            <Box gridColumn="span 11" borderRadius="0.55rem" paddingRight={1}>
              <RHFAutoComplete
                options={members?.results || []}
                control={control}
                name="member"
                placeholder="Choose a member to see their loans"
                error={!!errors?.member}
                helperText={errors.member?.message}
                isFetch={isFetching}
                multiple={false}
              />
            </Box>
            <Box gridColumn="span 1" borderRadius="0.55rem" paddingRight={1}>
              <Button
                type="submit"
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "13px 20px",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#3c52b2",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
            {isLoanLoading ? (
              <Box
                gridColumn="span 12"
                borderRadius="0.55rem"
                marginTop={2}
                marginRight={2}
              >
                {" "}
                <CustomLinearProgress />
              </Box>
            ) : selectedRow ? (
              <Box
                gridColumn="span 12"
                borderRadius="0.55rem"
                marginTop={2}
                marginRight={2}
              >
                <GlassCard variant="outlined">
                  <FlexBetween>
                    <StyledCardHeader
                      title={
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: "1.4rem" }}
                          gutterBottom
                          variant="h5"
                          // display="block"
                        >
                          {toTitleCase(selectedRow?.lendee)}
                        </Typography>
                      }
                    />

                    <StyledChip
                      label={selectedRow?.status_name}
                      variant="filled"
                      color={
                        selectedRow?.status_name === "ACCEPTED"
                          ? "success"
                          : selectedRow?.status_name === "PENDING"
                          ? "primary"
                          : selectedRow?.status_name === "REJECTED"
                          ? "error"
                          : "primary"
                      }
                    />
                  </FlexBetween>
                  <Divider />
                  <CardContent>
                    <FlexBetween>
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Remaining Balance
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {formatToKes(selectedRow?.remaining_balance)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Total Payable
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {formatToKes(selectedRow?.total_payment)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Principal Amount
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {formatToKes(selectedRow?.principal_amount)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Monthly Installment
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {formatToKes(selectedRow?.monthly_payment)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Total Interest
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {formatToKes(selectedRow?.total_interest)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </FlexBetween>
                    <Divider />
                    <FlexBetween>
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Late Charge Percentage
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {selectedRow?.late_charge_percentage}%
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Total Late Charge Applied
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {formatToKes(selectedRow?.total_late_charge)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Excess Payment
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {formatToKes(selectedRow?.excess_payment)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Grace Period
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {selectedRow?.is_grace_period
                                ? selectedRow?.remaining_grace_period
                                : "Ended"}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </FlexBetween>
                    <Divider />
                    <FlexBetween>
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Application Date
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {formatDate(selectedRow?.application_date)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Start Date
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {formatDate(selectedRow?.start_date)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider
                        orientation="vertical"
                        variant="middle"
                        flexItem
                      />
                      <Box>
                        <Box>
                          <Box>
                            <Typography
                              sx={{ fontSize: "0.85rem" }}
                              variant="caption"
                              gutterBottom
                            >
                              {" "}
                              Loan Term
                            </Typography>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ fontWeight: "bold" }}
                              variant="h4"
                              gutterBottom
                            >
                              {" "}
                              {selectedRow?.term} Months
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                    </FlexBetween>
                    <Divider />
                    <Box>
                      <Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "0.85rem" }}
                            variant="caption"
                            gutterBottom
                          >
                            {" "}
                            Reason for loan application
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            sx={{ fontWeight: "bold" }}
                            variant="h4"
                            gutterBottom
                          >
                            {" "}
                            {selectedRow?.reason}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.85rem" }}
                          variant="caption"
                          gutterBottom
                        >
                          {" "}
                          Created By
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="h4"
                          gutterBottom
                        >
                          {" "}
                          {selectedRow?.reason}
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <Box>
                        <Typography
                          sx={{ fontSize: "0.85rem" }}
                          variant="caption"
                          gutterBottom
                        >
                          {" "}
                          Created on
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontWeight: "bold" }}
                          variant="h4"
                          gutterBottom
                        >
                          {" "}
                          {selectedRow?.reason}
                        </Typography>
                      </Box>
                    </Box>
                  </CardActions>
                </GlassCard>
              </Box>
            ) : (
              <Box
                gridColumn="span 12"
                borderRadius="0.55rem"
                marginTop={2}
                marginRight={2}
              >
                <Typography
                  sx={{ fontWeight: "bold" }}
                  variant="h4"
                  gutterBottom
                >
                  Select a loan from the right pane
                </Typography>
              </Box>
            )}

            <Box
              gridColumn="span 12"
              borderRadius="0.55rem"
              marginRight={2}
              marginTop={1}
            >
              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                borderRadius="0.55rem"
                gap="5px"
              >
                {installmentss?.results.map((installment) => (
                  <Box
                    gridColumn="span "
                    gridRow="auto"
                    borderRadius="0.55rem"
                    key={installment.id}
                  >
                    <InstallmentsCard installment={installment} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box gridColumn="span 4" gridRow="span 1" borderRadius="0.55rem">
          {memberId ? (
            <LoanDetailsTable
              loans={memberLoans?.results}
              onRowClick={handleRowClick}
              isLoading={isLoading}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default ViewLoan;
