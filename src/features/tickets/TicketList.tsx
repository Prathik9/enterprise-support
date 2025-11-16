import {
    List,
    ListItemButton,
    ListItemText,
    ListItemSecondaryAction,
    Typography,
    Avatar,
    Box,
    Tooltip,
  } from "@mui/material";
  import PersonIcon from "@mui/icons-material/Person";
  import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
  import LowPriorityIcon from "@mui/icons-material/LowPriority";
  import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
  import ScheduleIcon from "@mui/icons-material/Schedule";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
  import type { Ticket } from "./types";
  
  type Props = {
    tickets: Ticket[];
    selectedId: string | null;
    onSelect: (id: string) => void;
  };
  
  const TicketList = ({ tickets, selectedId, onSelect }: Props) => {
    const priorityIcon = (p: string) => {
      if (p === "high")
        return <PriorityHighIcon sx={{ color: "#d32f2f" }} />;
      if (p === "medium")
        return <PriorityHighIcon sx={{ color: "#f57c00" }} />;
      return <LowPriorityIcon sx={{ color: "#1976d2" }} />;
    };
  
    const statusDot = (s: string) => {
      const color =
        s === "open" ? "green" : s === "pending" ? "orange" : "grey";
      return <FiberManualRecordIcon sx={{ fontSize: 12, color, mr: 1 }} />;
    };
  
    return (
      <List dense disablePadding>
        {tickets.map((t) => (
          <ListItemButton
            key={t.id}
            selected={t.id === selectedId}
            onClick={() => onSelect(t.id)}
            sx={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #f0f0f0",
              py: 1.2,
              "&.Mui-selected": {
                backgroundColor: "rgba(25,118,210,0.08)",
              },
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.04)",
              },
            }}
          >
            {/* USER ICON / AVATAR */}
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: "#1976d2",
                mr: 2,
                fontSize: 15,
              }}
            >
              {t.customerName.charAt(0)}
            </Avatar>
  
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {statusDot(t.status)}
                  <Typography sx={{ fontWeight: 600 }}>
                    {t.subject}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 1.2, mt: 0.4 }}
                >
                  <Box component="span">{t.customerName}</Box>
              
                  <ScheduleIcon sx={{ fontSize: 14 }} />
                  <Box component="span">
                    {new Date(t.createdAt).toLocaleTimeString()}
                  </Box>
              
                  <ChatBubbleOutlineIcon sx={{ fontSize: 14 }} />
                  <Box component="span">{t.messages?.length || 0}</Box>
                </Typography>
              }
              
            />
  
            <ListItemSecondaryAction>
              <Tooltip title={t.priority}>
                {priorityIcon(t.priority)}
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItemButton>
        ))}
      </List>
    );
  };
  
  export default TicketList;
  