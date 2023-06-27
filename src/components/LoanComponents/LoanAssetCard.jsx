import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Typography,
  useTheme,
  useThemeProps,
} from "@mui/material";
import styled from "@emotion/styled";
import FlexBetween from "../FlexBetween";
import toTitleCase from "../../utils/titleCaseConverter";
import formatDate from "../../utils/formatDate";
import LoanAssetViewModal from "./LoanAssetViewModal";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import defaultImage from "../../assets/file.png";

const GlassCard = styled(Card)`
  background-color: rgba(87, 86, 86, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 10px;
  /* width:20rem */
`;

const StyledCardHeader = styled(CardHeader)`
  .MuiCardHeader-title {
    /* font-size: 18px; */
    color: #f3f3f3;
    font-weight: bold;
    /* text-align: center; */
  }
`;

const StyledChip = styled(Chip)`
  font-weight: bold;
  font-size: 0.75rem;
`;
const LoanAssetCard = ({ asset, isInModal, keyy }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const handleDownloadClick = () => {
    const fileUrl = asset.file;
    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "";
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading the file:", error);
      });
  };

  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <GlassCard key={keyy} variant="outlined">
      <LoanAssetViewModal open={openModal} onClose={handleModalClose} />
      <FlexBetween>
        <StyledCardHeader
          title={
            isInModal ? (
              <Typography
                sx={{ fontWeight: "bold" }}
                gutterBottom
                variant="button"
                display="block"
              >
                {toTitleCase(asset.document_name)}
              </Typography>
            ) : (
              <Typography
                sx={{ fontWeight: "bold" }}
                gutterBottom
                variant="h4"
                display="block"
              >
                {toTitleCase(asset.name)}
              </Typography>
            )
          }
        />
        {isInModal ? null : (
          <StyledChip
            label={asset.status}
            variant="filled"
            color={
              asset.status === "ACCEPTED"
                ? "success"
                : asset.status === "PENDING"
                ? "primary"
                : asset.status === "REJECTED"
                ? "error"
                : "primary"
            }
          />
        )}
      </FlexBetween>
      <Divider />
      {isInModal ? (
        <CardMedia
          component="img"
          height="150"
          src={asset.file}
          alt="Paella dish"
          onError={handleImageError}
        />
      ) : null}

      <CardContent>
        {isInModal ? (
          <Button
            variant="contained"
            startIcon={<DownloadForOfflineIcon />}
            onClick={handleDownloadClick}
          >
            Download
          </Button>
        ) : (
          <Typography
            sx={{ fontWeight: "bold" }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {toTitleCase(asset.loan)}'s Loan
          </Typography>
        )}

        <Typography variant="subtitle2" gutterBottom>
          {asset.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          by: {asset.created_by}
        </Typography>
        <Typography variant="caption" color="text.secondary" gutterBottom>
          on: {formatDate(asset.created_on)}
        </Typography>
        {isInModal ? null : (
          <Button
            onClick={handleModalOpen}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
            }}
          >
            View More
          </Button>
        )}
      </CardActions>
    </GlassCard>
  );
};

export default LoanAssetCard;
