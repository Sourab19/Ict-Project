import React from "react";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // Define paths where the Footer should be hidden
  const hideFooterOn = ["/"]; // add more routes if needed

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5", // Optional background
      }}
    >


      {/* Main content (fills available space) */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Outlet />
      </Box>

      {/* Footer at the bottom unless hidden */}
      {!hideFooterOn.includes(location.pathname) && <Footer />}
    </Box>
  );
};

export default Layout;
