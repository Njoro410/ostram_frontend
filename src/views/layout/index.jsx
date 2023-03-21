import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useState } from "react";
import Appbar from "../../components/Appbar";
import MyAppBar from "../../components/Appbar";
import DrawerComponent from "../../components/Drawer";
import AppBarComponent from "../../components/Appbar";


const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box display={isNonMobile ? "flex" : "flex"} width="100%" height="100%">
      {/* <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      /> */}
      <DrawerComponent open={open} handleDrawerClose={handleDrawerClose}        />
      <Box flexGrow={1}>
        {/* <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        /> */}
        {/* <Appbar /> */}
        <AppBarComponent open={open} handleDrawerOpen={handleDrawerOpen} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
