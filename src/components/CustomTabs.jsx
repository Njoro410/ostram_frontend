import React from "react";
import { Tabs, Tab, Tooltip } from "@mui/material";

const CustomTabs = ({ tabs, value, onChange, orientation }) => {
  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      orientation = {orientation ? "vertical" : ""}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="tabs"
      value={value}
      onChange={onChange}
      sx={{
        "& .MuiTab-root": {
          fontSize: "0.8rem",
          paddingX: "1rem",
        },
        "& .MuiTabs-scrollButtons.Mui-disabled": {
          opacity: 0.3,
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
