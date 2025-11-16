// src/layout/SideNav.tsx
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
  } from "@mui/material";
  import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
  import AssessmentIcon from "@mui/icons-material/Assessment";
  import PeopleIcon from "@mui/icons-material/People";
  import SettingsIcon from "@mui/icons-material/Settings";
  import GroupIcon from "@mui/icons-material/Group";
  
  type Props = { width: number };
  
  const SideNav = ({ width }: Props) => {
    return (
      <Drawer
        variant="permanent"
        sx={{
          width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary">
            SUPPORT
          </Typography>
        </Box>
  
        <List dense>
          <ListItemButton selected>
            <ListItemIcon>
              <HelpOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Tickets" />
          </ListItemButton>
  
          <ListItemButton>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
  
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
        </List>
  
        <Box sx={{ px: 2, pt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            SETTINGS
          </Typography>
        </Box>
  
        <List dense>
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Team" />
          </ListItemButton>
  
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </List>
      </Drawer>
    );
  };
  
  export default SideNav;
  