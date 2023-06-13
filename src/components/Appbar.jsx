import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "./FlexBetween";
import {
  Avatar,
  Divider,
  InputBase,
  Menu,
  MenuItem,
  Slide,
  Tooltip,
  useScrollTrigger,
} from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Logout,
  PersonAdd,
  Search,
  Settings,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../features/theme/themeSlice";
import useUser from "../hooks/useUser";
import ProfileMenu from "./ProfileMenu";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  color: theme.palette.secondary[200],
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function AppBarComponent({ open, handleDrawerOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const trigger = useScrollTrigger();

  const [anchorEl, setAnchorEl] = useState(null);
  const openn = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, isLoading, isSuccess, isError, error } = useUser();

  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Redirect to member list page with search query
    window.location.href = `/view members?search=${encodeURIComponent(
      searchQuery
    )}`;
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar
        sx={{
          // position: "static",
          // background: "none",
          boxShadow: "none",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            // color: theme.palette.secondary[200],
            // backgroundColor: theme.palette.background.alt,
          }}
        >
          {/* Left side */}
          <FlexBetween>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <FlexBetween
              backgroundColor={theme.palette.background.default}
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
              component="form" // Add form element to handle form submission
              onSubmit={handleSearchSubmit} // Handle form submission
            >
              <InputBase
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <IconButton type="submit">
                <Search />
              </IconButton>
            </FlexBetween>
          </FlexBetween>

          {/* rigth side */}
          <FlexBetween gap="0rem">
            <Tooltip
              title={theme.palette.mode === "dark" ? "Light mode" : "Dark mode"}
            >
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openn ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openn ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user?.results.fullname?.substring(0, 1)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </FlexBetween>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openn}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <ProfileMenu handleClose={handleClose} theme={theme} />
          </Menu>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
