import { useNetwork } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import SignalWifiStatusbarConnectedNoInternet4OutlinedIcon from "@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4Outlined";
import SignalWifiStatusbar4BarOutlinedIcon from "@mui/icons-material/SignalWifiStatusbar4BarOutlined";

const NetworkCheck = () => {
  const networkStatus = useNetwork();
  const cleanNotifications = () => {
    notifications.cleanQueue;
  };

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
        onOpen: { cleanNotifications },
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
    } else {
      notifications.show({
        id: "no-network",
        color: "red",
        title: "CAUTION!!",
        message:
          "Internet connection has been disconnected. Please check your network settings",
        autoClose: false,
        withCloseButton: true,
        onOpen: { cleanNotifications },
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
    }
  }, [networkStatus.online]);

  if(networkStatus.online) {
    notifications.hide('no-network')
  }
  

  return null;
};

export default NetworkCheck;
