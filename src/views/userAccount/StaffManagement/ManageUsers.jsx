import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CustomTabs from "../../../components/CustomTabs";
import AllStaff from "./AllStaff";
import { useGetAllStaffQuery } from "../../../services/authorization/authorizationSlices";
import ViewStaff from "./ViewStaff";
import AddStaff from "./AddStaff";
import EditStaff from "./EditStaff";

const ManageUsers = () => {
  const [staff, setStaff] = useState([]);

  const { data: users, isFetching } = useGetAllStaffQuery();

  const [activeManageStaffTab, setActiveManageStaffTab] = useState(0);

  useEffect(() => {
    if (users) {
      setStaff(users);
    }
  }, [users]);

  

  const handleManageStaffTabChange = (event, newValue) => {
    setActiveManageStaffTab(newValue);
  };

  const staffTabs = [
    {
      label: "All Staff",
    },
    {
      label: "View Staff",
    },
    {
      label: "Add Staff",
    },
    {
      label: "Edit Staff Details",
    },
    {
      label: "Permission Groups",
    },
  ];

  return (
    <Box sx={{ overflowX: "auto" }}>
      <CustomTabs
        tabs={staffTabs}
        value={activeManageStaffTab}
        onChange={handleManageStaffTabChange}
      />
      {activeManageStaffTab === 0 && <AllStaff users={staff?.results} />}
      {activeManageStaffTab === 1 && (
        <ViewStaff users={staff?.results} isFetch={isFetching} />
      )}
      {activeManageStaffTab === 2 && (
        <AddStaff users={staff?.results} isFetching={isFetching} />
      )}
      {activeManageStaffTab === 3 && <EditStaff users={staff?.results} />}
    </Box>
  );
};

export default ManageUsers;
