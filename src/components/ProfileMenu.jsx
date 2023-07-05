import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { Logout, Settings, PersonAdd } from "@mui/icons-material";
import useLogout from "../hooks/useLogout";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ handleClose, theme }) => {
  const handleLogout = useLogout();
  const navigate = useNavigate();
  // const { user, isLoading, isSuccess, isError, error } = useUser();

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const handleNavigateToSettings = () => {
    navigate("/settings");
  };
  return (
    <Box sx={{ bgcolor: theme.palette.background.alt }}>
      <MenuItem onClick={handleClose && handleNavigateToProfile}>
        <Avatar /> Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <PersonAdd fontSize="small" />
        </ListItemIcon>
        Add another account
      </MenuItem>
      <MenuItem onClick={handleClose && handleNavigateToSettings}>
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
