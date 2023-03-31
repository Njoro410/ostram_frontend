import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  FolderOpenOutlined,
  PersonAddOutlined,
  LocalPoliceOutlined,
  SavingsOutlined,
  AccountBalanceWalletOutlined,
  AddBoxOutlined,
  AddCardOutlined,
  FormatListNumberedOutlined,
  PlaylistAddCheckOutlined,
  CalculateOutlined
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { Scrollbars } from "react-custom-scrollbars";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Members",
    icon: null,
  },
  {
    text: "View Members",
    icon: <Groups2Outlined />,
  },
  {
    text: "Member Registration",
    icon: <PersonAddOutlined />,
  },
  {
    text: "Member File",
    icon: <FolderOpenOutlined />,
  },
  {
    text: "CRB Information",
    icon: <LocalPoliceOutlined />,
  },
  {
    text: "Accounts",
    icon: null,
  },
  {
    text: "Savings Account",
    icon: <SavingsOutlined />,
  },
  {
    text: "Deposits Account",
    icon: <AccountBalanceWalletOutlined />,
  },
  {
    text: "Add Contributions",
    icon: <AddBoxOutlined />,
  },
  {
    text: "Loans",
    icon: null,
  },
  {
    text: "Apply Loan",
    icon: <AddCardOutlined />,
  },
  {
    text: "Loan List",
    icon: <FormatListNumberedOutlined />,
  },
  {
    text: "Apps",
    icon: null,
  },
  {
    text: "TODO List",
    icon: <PlaylistAddCheckOutlined />,
  },
  {
    text: "Loan Calculator",
    icon: <CalculateOutlined />,
  },
];

export default function DrawerComponent({
  open,
  handleDrawerClose,
  isNonMobile,
}) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, []);

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          color: theme.palette.secondary[200],
          backgroundColor: theme.palette.background.alt,
          boxSixing: "border-box",
          borderWidth: isNonMobile ? 0 : "2px",
          flexShrink: 0,
        },
      }}
    >
      <DrawerHeader>
        <Box>
          <FlexBetween color={theme.palette.secondary.main}>
            <Box display="flex" alignItems="center" gap="1.5rem">
              <Typography variant="h4" fontWeight="bold">
                Ostram Sacco
              </Typography>

              {!isNonMobile && (
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeft />
                </IconButton>
              )}
            </Box>
          </FlexBetween>
        </Box>
      </DrawerHeader>
    
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight={false}
        style={{ width: 240 }}
      >
        <Box>
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) { 
                return (
                  <Typography key={text} sx={{ m: open ? "2.25rem 0 1rem 3rem" : "", opacity: open ? 1 : 0 }}>
                    {text}
                  </Typography>
                );
              }
              const lcText = text.toLowerCase();

              return (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === lcText
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <Divider />
                    <ListItemIcon
                      sx={{
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                    {active === lcText && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          
        </Box>
      </Scrollbars>
    </Drawer>
  );
}
