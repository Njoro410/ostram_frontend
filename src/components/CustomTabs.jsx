import React from "react";
import { Tabs, Tab, Tooltip, useTheme } from "@mui/material";

const CustomTabs = ({ tabs, value, onChange, orientation }) => {
  const theme = useTheme()
  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      orientation={orientation ? "vertical" : "horizontal"}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="tabs"
      value={value}
      onChange={onChange}
      sx={{
        "& .MuiTab-root": {
          fontSize: "0.85rem",
          paddingX: "1rem",
          display: "flex",
          alignItems: "flex-start",
        },
        "& .MuiTabs-scrollButtons.Mui-disabled": {
          opacity: 0.3,
        },
        "& .Mui-selected": {
          backgroundColor: theme.palette.neutral.main,
        },
      }}
    >
      {tabs?.map((tab, index) => (
        <Tooltip key={index} title={tab.tooltip}>
          <Tab label={tab.label} />
        </Tooltip>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
