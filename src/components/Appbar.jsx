import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerComponent from "./Drawer";
import FlexBetween from "./FlexBetween";
import { InputBase, Slide, useScrollTrigger } from "@mui/material";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../features/theme/themeSlice";

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
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase  placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* rigth side */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
    </Slide>
  );
}
