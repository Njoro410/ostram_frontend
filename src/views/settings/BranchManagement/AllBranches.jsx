import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import FlexBetween from "../../../components/FlexBetween";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const GlassCard = styled(Card)`
  background-color: rgba(87, 86, 86, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AllBranches = ({ branches }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      gridAutoRows="160px"
      gap="5px"
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
      }}
    >
      {branches?.map((branch) => (
        <GlassCard key={branch.id} sx={{ minWidth: 275 }}>
          <CardContent>
            <FlexBetween>
              <Typography
                sx={{ fontSize: 14 }}
                color={theme.palette.secondary[500]}
                gutterBottom
              >
                {branch.name === "KAJIADO"
                  ? "Main Branch (HQ)"
                  : "Sub Branch"}
              </Typography>

              <Typography
                sx={{ mb: 1.5, display: "flex", gap: 0.5 }}
                color="text.secondary"
              >
                <ManageAccountsIcon />
                {branch.manager_name}
              </Typography>
            </FlexBetween>

            <FlexBetween>
              <Typography variant="h5" component="div">
                {branch.name}
              </Typography>

              <Chip
                sx={{
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  borderRadius: 1,
                  mt: 1,
                  "& .MuiChip-label": {
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    // color:"white"
                  },
                }}
                size="small"
                label={branch.branch_status_name}
                color={
                  branch.branch_status_name.toUpperCase() === "ACTIVE"
                    ? "success"
                    : branch.branch_status_name.toUpperCase() === "INACTIVE"
                    ? "error"
                    : null
                }
              />
            </FlexBetween>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between", px: 2.5 }}
          >
            <Typography variant="button">{branch.phone}</Typography>
            <Typography variant="button">{branch.email}</Typography>
          </CardActions>
        </GlassCard>
      ))}
    </Box>
  );
};

export default AllBranches;
