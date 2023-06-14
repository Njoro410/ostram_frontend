import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import LoanDocumentCard from "../../../components/LoanComponents/LoanDocumentCard";

const AllDocuments = ({ documents }) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      borderRadius="0.55rem"
      p="1rem"
      sx={{
        "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
      }}
    >
      {documents?.map((document) => (
        <Box
          key={document.id}
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
          p={2}
          height="fit-content"
        >
          <LoanDocumentCard document={document} />
        </Box>
      ))}
    </Box>
  );
};

export default AllDocuments;
