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
  Menu,
  Slide,
  Tooltip,
  useScrollTrigger,
  Autocomplete,
  TextField,
  Box,
  Badge,
} from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../features/theme/themeSlice";
import useUser from "../hooks/useUser";
import ProfileMenu from "./ProfileMenu";
import { useGetMembersQuery } from "../services/members/memberSlices";
import { useNavigate } from "react-router-dom";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import WifiOffOutlinedIcon from "@mui/icons-material/WifiOffOutlined";
import { useNetwork } from "@mantine/hooks";
import Fade from "@mui/material/Fade";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import NetworkMenu from "./NetworkMenu";

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
  const navigate = useNavigate();
  const networkStatus = useNetwork();

  const [anchorEl, setAnchorEl] = useState(null);
  const openProfileMenu = Boolean(anchorEl);

  const handleProfileMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoMenu",
  });

  const { user, isLoading, isSuccess, isError, error } = useUser();

  const [value, setValue] = useState(null);

  const handleMemberChange = (event, newValue) => {
    setValue(newValue);
    if (newValue) {
      navigate(`/member-details/${newValue.mbr_no}`);
    }
  };
  const { data: members, isFetching } = useGetMembersQuery();

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: !networkStatus.online ? "#ff2200" : "#2eb700",
      color: !networkStatus.online ? "#ff2200" : "#2eb700",
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar open={open}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            backgroundColor: theme.palette.background.default,
           
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
              component="form"
            >
            <IconButton {...bindHover(popupState)}>
              {networkStatus.online ? (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  variant="dot"
                >
                  <WifiOutlinedIcon sx={{ color: "#2eb700" }} />
                </StyledBadge>
              ) : (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  variant="dot"
                >
                  <WifiOffOutlinedIcon sx={{ color: "#ff0000" }} />
                </StyledBadge>
              )}
            </IconButton>

              <Autocomplete
                id="member-select"
                sx={{ width: 400 }}
                options={members?.results || []}
                autoHighlight
                getOptionLabel={(option) => (option ? option.names : "")}
                // popupIcon={<Search />}
                renderOption={(props, option) => (
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    key={option.mbr_no || option.id}
                  >
                    <p {...props} key={option.mbr_no}>
                      {option.names}
                    </p>
                    <p {...props}>{option.mbr_no}</p>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search members..."
                    fullWidth={true}
                  />
                )}
                onChange={handleMemberChange}
              />
            </FlexBetween>
          </FlexBetween>

          {/* right side */}
          <FlexBetween gap="0rem">


            <NetworkMenu
              bindMenu={bindMenu}
              networkStatus={networkStatus}
              popupState={popupState}
            />

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
                onClick={handleProfileMenuClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openProfileMenu ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openProfileMenu ? "true" : undefined}
              >
                <Avatar
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                  }}
                >
                  <Typography sx={{ fontSize: "1rem" }}>
                    {user?.results.first_name?.substring(0, 1)}
                  </Typography>
                </Avatar>
              </IconButton>
            </Tooltip>
          </FlexBetween>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openProfileMenu}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[200],
              },
            }}
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
                  bgcolor: theme.palette.background.alt,
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <ProfileMenu handleClose={handleProfileMenuClose} theme={theme} />
          </Menu>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
