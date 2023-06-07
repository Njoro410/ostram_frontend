import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import GroupedStackedColumn from "../../charts/GroupedStackedColumn";
import PieChart from "../../charts/PieChart";
import styled from "@emotion/styled";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
  font-size:0.75rem;
`;

const LoanProducts = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const rate = 1.2;

  return (
    <Box mt="2rem">
      <FlexBetween>
        <Header title="LOAN PRODUCTS" subtitle="Details about loan products" />

        <Box>
          <Button
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
            Add Loan Product
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        // backgroundColor={theme.palette.background.alt}
        borderRadius="0.55rem"
        // height='100vh'
        p="1rem"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          height="25rem"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          // border="1px solid"
          // borderColor={theme.palette.secondary[800]}
          paddingY={2}
        >
          <GroupedStackedColumn />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          height="25rem"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          // border="1px solid"
          // borderColor={theme.palette.secondary[800]}
          paddingY={2}
        >
          <PieChart />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          // border="1px solid"
          // borderColor={theme.palette.secondary[800]}
          p={2}
          mt="3.5rem"
        >
          <GlassCard variant="outlined" sx={{ height: "100%" }}>
            <FlexBetween>
              <StyledCardHeader
                title="Wezesha Loan"
                titleTypographyProps={{
                  component: "h1",
                }}
              />

              <StyledChip label={`Rate | ${rate}%`} variant="filled" color="primary" />
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
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to
                cook together with your guests. Add 1 cup of frozen peas along
                with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Edit</Button>
              <Button size="small">Delete</Button>
            </CardActions>
          </GlassCard>
        </Box>
      </Box>
    </Box>
  );
};

export default LoanProducts;
