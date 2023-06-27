import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material";
import React from "react";
import FlexBetween from "../FlexBetween";
import formatDate from "../../utils/formatDate";

const GlassCard = styled(Card)`
  background-color: rgba(87, 86, 86, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 10px;
  /* width:20rem */
`;

const StyledCardHeader = styled(CardHeader)`
  .MuiCardHeader-title {
    font-size: 18px;
    color: #f3f3f3;
    font-weight: bold;
    /* text-align: center; */
  }
`;

const StyledChip = styled(Chip)`
  font-weight: bold;
  font-size: 0.75rem;
`;
const InstallmentsCard = ({ installment }) => {
  const formatToKES = (amount) => {
    return `KSh ${parseFloat(amount).toLocaleString("en-KE")}`;
  };
  return (
    <GlassCard>
      <FlexBetween>
        <StyledCardHeader
          title={installment.installment_number}
          titleTypographyProps={{
            component: "h1",
          }}
        />

        <StyledChip
          label={installment.paid ? "Paid" : "Not Paid"}
          variant="filled"
          color={installment.paid ? "success" : "primary"}
        />
      </FlexBetween>
      <CardContent>
        <FlexBetween>
          <Box>
            <Box>
              <Typography
                sx={{ fontSize: "0.85rem" }}
                variant="caption"
                gutterBottom
              >
                {" "}
                Amount Due
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }} variant="h6" >
                {" "}
                {formatToKES(installment.amount_due)}
              </Typography>
            </Box>
          </Box>

          <Box>
            <Box>
              <Typography
                sx={{ fontSize: "0.85rem" }}
                variant="caption"
                
              >
                {" "}
               Amount Paid
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: "bold" }} variant="h6" >
                {" "}
                {formatToKES(installment.amount_paid)}
              </Typography>
            </Box>
          </Box>
        </FlexBetween>
      </CardContent>
      <CardActions>
        <Typography sx={{ fontSize: 14 }} variant="caption" >
          Due on: {formatDate(installment.due_date)}
        </Typography>
      </CardActions>
    </GlassCard>
  );
};

export default InstallmentsCard;
