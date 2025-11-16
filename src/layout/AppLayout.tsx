// src/layout/AppLayout.tsx
import type { ReactNode } from "react";
import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideNav from "./SideNav";

type Props = {
  children: ReactNode;
};

const drawerWidth = 220;
const appBarHeight = 64; // default MUI Toolbar height on desktop

const AppLayout = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Fixed top header */}
      <TopBar />

      {/* Main area below header */}
      <Box sx={{ display: "flex", flexGrow: 1, mt: `${appBarHeight}px` }}>
      {/* Left side nav */}
        <SideNav width={drawerWidth} />

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: `calc(100vh - ${appBarHeight}px)`,
            overflow: "hidden",
            bgcolor: "background.default",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
