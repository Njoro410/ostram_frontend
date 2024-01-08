import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useEnable2FAMutation } from "../../../services/authorization/authorizationSlices";
import QRCode from "react-qr-code";

const MFA = ({ user }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [uuid, setUuid] = useState(null);
  const [results, setResults] = useState(null);
  const [enable2FA, { isLoading }] = useEnable2FAMutation();

  useEffect(() => {
    setUuid(user?.results.uuid);
  }, [user]);

  const handleEnable2FA = async () => {
    try {
      const response = await enable2FA({
        data: { uuid: uuid },
      }).unwrap();
      setResults(response);
    } catch (error) {
      console.error("Failed to get QR Code", error);
    }
  };


  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      // gridAutoRows="160px"
      gap="10px"
      sx={{
        "& > div": {
          gridColumn: isNonMediumScreens ? undefined : "span 12",
        },
      }}
    >
      {results ? (
        <>
          <Box gridColumn="span 12" p="1.25rem 1rem">
            <Typography
              sx={{ fontWeight: "bold", textAlign: "center" }}
              variant="h4"
              gutterBottom
            >
              Scan this QR Code with Google Authenticator App
            </Typography>
          </Box>

          <Box gridColumn="span 4" />

          <Box gridColumn="span 4">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={results.otp_auth_url}
              viewBox={`0 0 256 256`}
            />
          </Box>

          <Box gridColumn="span 4" />
        </>
      ) : user?.results.is_authenticator ? (
        <Box gridColumn="span 12" p="1.25rem 1rem">
          <Typography
            sx={{ fontWeight: "bold", textAlign: "center" }}
            variant="h4"
            gutterBottom
          >
            You have enabled 2 Factor Authentication
          </Typography>
        </Box>
      ) : (
        <Box gridColumn="span 12" p="1.25rem 1rem">
          <Button
            type="submit"
            onClick={handleEnable2FA}
            fullWidth
            variant="contained"
            sx={{
              p: 2,
              backgroundColor: theme.palette.secondary[500],
              color: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: theme.palette.secondary[100],
              },
            }}
          >
            Enable 2-Factor Authentication (Recommended)
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MFA;
