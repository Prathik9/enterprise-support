import {
    Box,
    Typography,
    Chip,
    Divider,
    Avatar,
    Stack,
    TextField,
    IconButton,
  } from "@mui/material";
  import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
  import PersonIcon from "@mui/icons-material/Person";
  import SendIcon from "@mui/icons-material/Send";
  import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
  import { useState } from "react";
  import type { Ticket, ChatMessage } from "./types";
  import { useEffect } from "react";
    import { useRef } from "react";
  
  type Props = {
    ticket: Ticket | null;
    messages: ChatMessage[];
    onSendMessage: (text: string) => void;
  };
  
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  
  const TicketDetailsPanel = ({ ticket, messages, onSendMessage }: Props) => {
    const [draft, setDraft] = useState("");
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, [messages]);
      
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!draft.trim()) return;
      onSendMessage(draft);
      setDraft("");
    };
  
    if (!ticket) {
      return (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 3,
          }}
        >
          <HelpOutlineIcon sx={{ fontSize: 56, mb: 2, color: "grey.400" }} />
          <Typography variant="h6" gutterBottom>
            Select a Ticket
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose a ticket from the list to view conversation and details.
          </Typography>
        </Box>
      );
    }
  
    const createdAtText = new Date(ticket.createdAt).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          p: 2,
          gap: 1.5,
        }}
      >
        {/* Header */}
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <AssignmentTurnedInIcon />
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600 }}
                noWrap
                title={ticket.subject}
              >
                {ticket.subject}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonIcon fontSize="small" />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {ticket.customerName}
                </Typography>
              </Stack>
            </Box>
          </Stack>
  
          <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Chip
              label={`Status: ${capitalize(ticket.status)}`}
              size="small"
              color={
                ticket.status === "open"
                  ? "success"
                  : ticket.status === "pending"
                  ? "warning"
                  : "default"
              }
            />
            <Chip
              label={`Priority: ${capitalize(ticket.priority)}`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={createdAtText}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>
  
        <Divider />
  
        {/* Chat area */}
        <Box
          sx={{
            flexGrow: 1,
            minHeight: 0,
            overflowY: "auto",
            pr: 0.5,
          }}
        >
          <Stack spacing={1.5}>
            {messages.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                No messages yet. Start the conversation below.
              </Typography>
            )}
  
            {messages.map((msg) => {
              const isAgent = msg.sender === "agent";
              return (
                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",
                    justifyContent: isAgent ? "flex-end" : "flex-start",
                  }}
                >
                  <Stack
                    direction={isAgent ? "row-reverse" : "row"}
                    spacing={1}
                    alignItems="flex-end"
                    sx={{ maxWidth: "85%" }}
                  >
                    <Avatar sx={{ width: 28, height: 28 }}>
                      {isAgent ? "A" : "C"}
                    </Avatar>
                    <Box
                      sx={{
                        bgcolor: isAgent ? "primary.main" : "grey.100",
                        color: isAgent ? "primary.contrastText" : "text.primary",
                        borderRadius: 2,
                        px: 1.5,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-wrap" }}
                      >
                        {msg.text}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.7,
                          display: "block",
                          textAlign: "right",
                          mt: 0.5,
                        }}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString(undefined, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Box>
  
        {/* Composer */}
        <Box component="form" onSubmit={handleSubmit} sx={{ pt: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              size="small"
              placeholder="Type a reply..."
              fullWidth
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              multiline
              maxRows={3}
            />
            <IconButton type="submit" color="primary">
              <SendIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    );
  };
  
  export default TicketDetailsPanel;
  