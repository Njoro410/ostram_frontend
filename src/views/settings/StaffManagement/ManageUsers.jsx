import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AllStaff from "./AllStaff";
import { useGetAllStaffQuery } from "../../../services/authorization/authorizationSlices";
import ViewStaff from "./ViewStaff";
import AddStaff from "./AddStaff";
import EditStaff from "./EditStaff";
import PermissionGroups from "./PermissionGroups/PermissionGroups";
import Scrollbars from "react-custom-scrollbars-2";

const ManageUsers = ({ activeManageStaffTab }) => {
  const [staff, setStaff] = useState([]);

  const { data: users, isFetching } = useGetAllStaffQuery();

  useEffect(() => {
    if (users) {
      setStaff(users);
    }
  }, [users]);

  return (
    <Scrollbars autoHeight={false}>
      <Box>
        {activeManageStaffTab === 0 && <AllStaff users={staff?.results} />}
        {activeManageStaffTab === 1 && (
          <ViewStaff users={staff?.results} isFetch={isFetching} />
        )}
        {activeManageStaffTab === 2 && (
          <AddStaff users={staff?.results} isFetching={isFetching} />
        )}
        {activeManageStaffTab === 3 && <EditStaff users={staff?.results} />}
        {activeManageStaffTab === 4 && <PermissionGroups />}
      </Box>
    </Scrollbars>
  );
};

export default ManageUsers;
