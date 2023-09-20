import { Box } from "@mui/material";
import React, { useState } from "react";
import CustomTabs from "../../../../components/CustomTabs";
import AllPermissionGroups from "./AllPermissionGroups";
import CreatePermissionGroups from "./CreatePermissionGroups";
import DeletePermissionGroup from "./DeletePermissionGroup";

const PermissionGroups = () => {
  const [activePermTab, setActivePermTab] = useState(0);

  const handlePermTabChange = (event, newValue) => {
    setActivePermTab(newValue);
  };

  const permTabs = [
    {
      label: "All Permission Groups",
    },
    {
      label: "Create Permission Groups",
    },
    {
      label: "Delete Permission Groups",
    },
  ];
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Box>
        <CustomTabs
          tabs={permTabs}
          value={activePermTab}
          onChange={handlePermTabChange}
        />
      </Box>
      {activePermTab === 0 && <AllPermissionGroups />}
      {activePermTab === 1 && <CreatePermissionGroups />}
      {activePermTab === 2 && <DeletePermissionGroup />}
    </Box>
  );
};

export default PermissionGroups;
