import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AllBranches from "./AllBranches";
import ViewBranch from "./ViewBranch";
import CreateBranch from "./CreateBranch";
import EditBranch from "./EditBranch";
import { useGetAllBranchesQuery } from "../../../services/administration/administrationSlices";
import { useGetAllStaffQuery } from "../../../services/authorization/authorizationSlices";

const ManageBranches = ({ activeManageBranchTab }) => {
  const [branch, setBranch] = useState([]);

  const { data: branches, isFetching } = useGetAllBranchesQuery();

  useEffect(() => {
    if (branches) {
      setBranch(branches);
    }
  }, [branches]);

  const [staff, setStaff] = useState([]);

  const { data: users, isFetching: isFetchingUsers } = useGetAllStaffQuery();

  useEffect(() => {
    if (users) {
      setStaff(users);
    }
  }, [users]);

  return (
    <Box sx={{ overflowX: "auto" }}>
      {activeManageBranchTab === 0 && (
        <AllBranches branches={branch?.results} />
      )}
      {activeManageBranchTab === 1 && <ViewBranch />}
      {activeManageBranchTab === 2 && <CreateBranch staff={staff?.results} isFetching={isFetchingUsers}/>}
      {activeManageBranchTab === 3 && <EditBranch staff={staff?.results} isFetching={isFetchingUsers}/>}
    </Box>
  );
};

export default ManageBranches;
