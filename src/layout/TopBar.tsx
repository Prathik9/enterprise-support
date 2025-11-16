// src/layout/TopBar.tsx
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ConnectionStatus from "../components/ConnectonStatus";

const TopBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 1, // stay above sidebar
        boxShadow: "none",
      })}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Enterprise Support System
        </Typography>
        <ConnectionStatus status="Connected" />
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
