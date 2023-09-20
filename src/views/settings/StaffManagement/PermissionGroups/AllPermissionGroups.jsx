import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Groups2Icon from "@mui/icons-material/Groups2";
import { useGetAllPermGroupsQuery } from "../../../../services/authorization/authorizationSlices";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import KeyIcon from "@mui/icons-material/Key";

const AllPermissionGroups = () => {
  const theme = useTheme();
  const [groupsOpen, setGroupsOpen] = useState({});

  const { data: permGroups, isFetching } = useGetAllPermGroupsQuery();

  

  const handleListClick = (group) => {
    setGroupsOpen((prevState) => ({
      ...prevState,
      [group.name]: !prevState[group.name],
    }));
  };

  return (
    <Box
      backgroundColor={theme.palette.background.alt}
      display="flex"
      gap={2}
      flexWrap="wrap"
      p="1.25rem 1rem"
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        mt: 2,
      }}
    >
      {permGroups?.results.map((group) => (
        <List
          key={group.id}
          sx={{
            width: "100%",
            // maxWidth: 360,
            bgcolor: theme.palette.background.alt,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,

          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Permission Group Name: {group.name}
            </ListSubheader>
          }
        >
          <ListItemButton key={group.id} onClick={() => handleListClick(group)}>
            <ListItemIcon>
              <Groups2Icon />
            </ListItemIcon>
            <ListItemText primary="Included Permissions" />
            {groupsOpen[group.name] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={groupsOpen[group.name]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {group?.permission_list.map((permission) => (
                <ListItemButton key={permission.id} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <KeyIcon />
                  </ListItemIcon>
                  <ListItemText primary={permission.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      ))}
    </Box>
  );
};

export default AllPermissionGroups;
