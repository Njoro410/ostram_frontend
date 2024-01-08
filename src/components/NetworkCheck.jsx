import { useNetwork } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useCallback } from "react";
import SignalWifiStatusbarConnectedNoInternet4OutlinedIcon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4Outlined";
import SignalWifiStatusbar4BarOutlinedIcon from "@mui/icons-material/SignalWifiStatusbar4BarOutlined";

const NetworkCheck = () => {
  const networkStatus = useNetwork();

  const cleanNotifications = useCallback(() => {
    notifications.cleanQueue();
  }, []);

  useEffect(() => {
    if (networkStatus.online) {
      notifications.show({
        id: "yes-network",
        color: "green",
        title: "INTERNET RESTORED!!",
        message: "Internet connection has been restored.",
        autoClose: 5000,
        withCloseButton: true,
        onClose: { cleanNotifications },
        icon: (
          <SignalWifiStatusbar4BarOutlinedIcon
            sx={{ backgroundSize: "1rem", backgroundColor: "#02d054" }}
          />
        ),
        styles: () => ({
          root: {
            backgroundColor: "#02d054",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });
      notifications.hide("no-network");
    } else {
      notifications.show({
        id: "no-network",
        color: "red",
        title: "CAUTION!!",
        message:
          "Internet connection has been disconnected. Please check your network settings",
        autoClose: false,
        withCloseButton: true,
        onClose: { cleanNotifications },
        icon: (
          <SignalWifiStatusbarConnectedNoInternet4OutlinedIcon
            sx={{ backgroundSize: "1rem" }}
          />
        ),
        styles: () => ({
          root: {
            backgroundColor: "#f94c18",
            borderColor: "white",
            "&::before": { backgroundColor: "white" },
          },
          title: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.95rem",
          },
          description: {
            color: "white",
            fontWeight: "bolder",
            fontSize: "0.8rem",
          },
          closeButton: {
            color: "white",
            "&:hover": { backgroundColor: "gray" },
          },
        }),
      });
      notifications.hide("yes-network");
    }
  }, [networkStatus.online]);

  return null;
};

export default NetworkCheck;
