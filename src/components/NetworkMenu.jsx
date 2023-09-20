import { Box, Divider, Typography, useTheme } from "@mui/material";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import React from "react";
import FlexBetween from "./FlexBetween";

const NetworkMenu = ({ bindMenu, popupState, networkStatus }) => {
  const theme = useTheme();

  return (
    <HoverMenu
      sx={{
        "& .MuiMenu-paper": {
          backgroundColor: theme.palette.background.default,
        },
      }}
      {...bindMenu(popupState)}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box px={2}>
        <FlexBetween sx={{ py: 1 }}>
          <Typography>Status</Typography>
          <Typography
            sx={{
              color: networkStatus.online ? "#2eb700" : "#ff0000",
              fontWeight: "bold",
            }}
          >
            {networkStatus.online ? "Online" : "Offline"}
          </Typography>
        </FlexBetween>
        <Divider />
        <FlexBetween sx={{ py: 1 }}>
          <Typography>Downlink</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {networkStatus.downlink}
          </Typography>
        </FlexBetween>
        <Divider />
        <FlexBetween sx={{ py: 1 }}>
          <Typography>RTT</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {networkStatus.rtt}
          </Typography>
        </FlexBetween>
        <Divider />
        <FlexBetween sx={{ py: 1 }}>
          <Typography>Effective Type</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {networkStatus.effectiveType}
          </Typography>
        </FlexBetween>
        <Divider />
        {/* <FlexBetween sx={{ py: 1 }}>
          <Typography>Network Type</Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            {networkStatus.type}
          </Typography>
        </FlexBetween> */}
      </Box>
    </HoverMenu>
  );
};

export default NetworkMenu;
