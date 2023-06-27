import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import FlexBetween from "../FlexBetween";
import toTitleCase from "../../utils/titleCaseConverter";
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
const LoanDocumentCard = ({ document }) => {
  const theme = useTheme();

  return (
    <GlassCard variant="outlined">
      <FlexBetween>
        <StyledCardHeader
          title={document.document_type}
          titleTypographyProps={{
            component: "h1",
          }}
        />

        <StyledChip
          label={document.status}
          variant="filled"
          color={
            document.status === "ACCEPTED"
              ? "success"
              : document.status === "PENDING"
              ? "primary"
              : document.status === "REJECTED"
              ? "error"
              : "primary"
          }
        />
      </FlexBetween>
      <CardMedia
        component="img"
        height="150"
        image={document.file}
        alt="Paella dish"
      />
      <CardContent>
        <Typography
          sx={{ fontWeight: "bold" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {toTitleCase(document.loan_owner)}'s Loan
        </Typography>
      </CardContent>
      <CardActions sx={{display:"flex",justifyContent:"space-between"}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Uploaded by: {document.created_by}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            on: {formatDate(document.upload_date)}
          </Typography>
      </CardActions>
    </GlassCard>
  );
};

export default LoanDocumentCard;
