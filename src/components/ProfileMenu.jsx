import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { Logout, Settings, PersonAdd } from "@mui/icons-material";
import useLogout from "../hooks/useLogout";


const ProfileMenu = ({ handleClose, theme }) => {
  const handleLogout = useLogout();
  return (
    <Box sx={{ bgcolor: theme.palette.background.alt }}>
      <MenuItem onClick={handleClose}>
        <Avatar /> Profile
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Avatar /> My account
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleClose && handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Box>
  );
};

export default ProfileMenu;
