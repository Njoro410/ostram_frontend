import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Collapse,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import styled from "@emotion/styled";
import FlexBetween from "../../components/FlexBetween";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const GlassCard = styled(Card)`
  background-color: rgba(87, 86, 86, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 10px;
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

const LoanProductCard = ({ unique_key, type }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  // console.log(type.documents)
  // console.log(type.documents)
  const ellipsis = !expanded
    ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "100%",
      }
    : "";

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <GlassCard key={unique_key} variant="outlined">
      <FlexBetween>
        <StyledCardHeader
          title={`${type.name} Loan`}
          titleTypographyProps={{
            component: "h1",
          }}
        />

        <StyledChip
          label={`Rate | ${type.rate}%`}
          variant="filled"
          color="primary"
        />
      </FlexBetween>
      <Divider variant="middle" />
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary.light}
          gutterBottom
          variant="subtitle2"
        >
          Description
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            ...ellipsis,
            paddingBottom: 1.5,
          }}
        >
          {type.description}
        </Typography>
        <Divider variant="middle" />
      </CardContent>
      <CardActions>
        {!expanded ? (
          <Typography variant="overline" sx={{ fontSize: "0.75rem" }}>
            Show More
          </Typography>
        ) : (
          <Typography variant="overline" sx={{ fontSize: "0.75rem" }}>
            Show Less
          </Typography>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Box>
            <Typography variant="overline" sx={{ fontSize: "0.75rem" }}>
              Security
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Box display="flex" flexWrap="wrap" gap={0.5}>
              {type.need_guarantor ? (
                <Chip label="Guarantors" color="success" />
              ) : (
                <Chip label="Guarantors" />
              )}
              {type.need_collateral ? (
                <Chip label="Collateral" color="success" />
              ) : (
                <Chip label="Collateral" />
              )}
            </Box>
          </Box>
          <Box>
            <Typography variant="overline" sx={{ fontSize: "0.75rem" }}>
              Documents
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Box display="flex" flexWrap="wrap" gap={0.5}>
              {type?.documents.map((document, index) => (
                <Tooltip key={index} title={document.description}>
                  <Chip  label={document.name} />
                </Tooltip>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="overline" sx={{ fontSize: "0.75rem" }}>
              Loan Amount
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Box>
              <FlexBetween>
                <Typography variant="overline" sx={{ fontSize: "0.75rem" }}>
                  Minimum Amount <br />
                  Ksh {type.min_amount_allowed.toLocaleString()}
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography variant="overline" sx={{ fontSize: "0.75rem" }}>
                  Maximum Amount <br /> Ksh{" "}
                  {type.max_amount_allowed.toLocaleString()}
                </Typography>
              </FlexBetween>
            </Box>
          </Box>
          <Box>
            <FlexBetween>
              <Button variant="contained">Edit</Button>
              <Button variant="contained" color="error">
                Delete
              </Button>
            </FlexBetween>
          </Box>
        </CardContent>
      </Collapse>
      {/* <CardActions> */}
      {/* <Box>
                <FlexBetween >
                <Button variant="contained">Edit</Button>
                <Button variant="contained" color="error">Delete</Button>
                </FlexBetween>
              </Box> */}
      {/* </CardActions> */}
    </GlassCard>
  );
};

export default LoanProductCard;
