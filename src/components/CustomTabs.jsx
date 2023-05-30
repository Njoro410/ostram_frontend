import React from "react";
import { Tabs, Tab } from "@mui/material";

const CustomTabs = ({ tabs, value, onChange }) => {
  return (
    <Tabs
      variant="scrollable"
      scrollButtons="auto"
      textColor="secondary"
      indicatorColor="secondary"
      value={value}
      onChange={onChange}
      sx={{
        "& .MuiTab-root": {
          fontSize: "0.8rem",
          paddingX: "0rem"
        },
        "& .MuiTabs-scrollButtons.Mui-disabled": {
          opacity: 0.3,
        },
      }}
    >
      {tabs?.map((tab, index) => (
        <Tab key={index} label={tab.label} />
      ))}
    </Tabs>
  );
};

export default CustomTabs;
