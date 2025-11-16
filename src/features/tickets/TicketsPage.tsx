import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TicketList from "./TicketList";
import TicketDetailsPanel from "./TicketDetailsPanel";
import TicketListToolbar from "./TicketListToolbar";
import FloatingActionButton from "../../components/FloatingActionButton";
import type { Ticket, ChatMessage } from "./types";
import CreateTicketDialog from "./CreateTicketDialog";
import { useSnackbar } from "notistack";


const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    subject: "Cannot access account dashboard",
    customerName: "John Doe",
    createdAt: "2025-11-10T09:30:00Z",
    status: "open",
    priority: "high",
    messages: [],
  },
  {
    id: "2",
    subject: "Invoice mismatch for October",
    customerName: "Acme Corp",
    createdAt: "2025-11-09T14:15:00Z",
    status: "pending",
    priority: "medium",
    messages: [],
},
  {
    id: "3",
    subject: "Feature request: export to CSV",
    customerName: "Jane Smith",
    createdAt: "2025-11-08T11:00:00Z",
    status: "closed",
    priority: "low",
    messages: [],
  },

    
];

const MOCK_CHAT_BY_TICKET: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "m1",
      sender: "customer",
      text: "Hi, I am unable to access my dashboard since yesterday.",
      timestamp: "2025-11-10T09:31:00Z",
    },
    {
      id: "m2",
      sender: "agent",
      text: "Thanks for reaching out! Are you seeing any specific error message?",
      timestamp: "2025-11-10T09:35:00Z",
    },
  ],
  "2": [
    {
      id: "m3",
      sender: "customer",
      text: "The invoice total seems higher than expected.",
      timestamp: "2025-11-09T14:16:00Z",
    },
    {
      id: "m4",
      sender: "agent",
      text: "I'll review your invoice for October and get back to you.",
      timestamp: "2025-11-09T14:20:00Z",
    },
  ],
};

const TicketsPage = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chatByTicket, setChatByTicket] =
    useState<Record<string, ChatMessage[]>>(MOCK_CHAT_BY_TICKET);
const [openCreateDialog, setOpenCreateDialog] = useState(false);


  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
const [statusFilter, setStatusFilter] = useState("all");
const [priorityFilter, setPriorityFilter] = useState("all");
const filteredTickets = tickets.filter((t) => {
  const matchesSearch = searchQuery.trim()
    ? t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    : true;

  const matchesStatus = statusFilter === "all" || t.status === statusFilter;
  const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;

  return matchesSearch && matchesStatus && matchesPriority;
});
  
  useEffect(() => {
    // simulate loading
    setTimeout(() => {
      setTickets(MOCK_TICKETS);
      setLoading(false);
      setSelectedId(MOCK_TICKETS[0]?.id ?? null);
    }, 500);
  }, []);

  const selectedTicket = tickets.find((t) => t.id === selectedId) || null;
  const messagesForSelected =
    (selectedId && chatByTicket[selectedId]) || [];

  const handleSendMessage = (ticketId: string, text: string) => {
    if (!text.trim()) return;

    setChatByTicket((prev) => {
      const existing = prev[ticketId] || [];
      const newMessage: ChatMessage = {
        id: `local-${Date.now()}`,
        sender: "agent",
        text: text.trim(),
        timestamp: new Date().toISOString(),
      };
      return {
        ...prev,
        [ticketId]: [...existing, newMessage],
      };
    });
    enqueueSnackbar("Message sent", {
        variant: "info",
        autoHideDuration: 1000,
      });

      setTimeout(() => {
        setChatByTicket((prev) => ({
          ...prev,
          [ticketId]: [
            ...prev[ticketId],
            {
              id: "reply-" + Date.now(),
              sender: "customer",
              text: "Thanks for the quick response!",
              timestamp: new Date().toISOString(),
            },
          ],
        }));
      
        enqueueSnackbar("Customer replied!", {
          variant: "warning",
        });
      }, 1500);
      
      
  };

  
  const handleCreateTicket = (data: {
    subject: string;
    customerName: string;
    priority: string;
    description: string;
  }) => {
    const id = Date.now().toString();
  
    const newTicket: Ticket = {
      id,
      subject: data.subject,
      customerName: data.customerName,
      createdAt: new Date().toISOString(),
      status: "open",
      priority: data.priority as "low" | "medium" | "high",
      messages: [],
    };
  
    // Add to list
    setTickets((prev) => [newTicket, ...prev]);
  
    // Create empty chat + add description as initial message
    setChatByTicket((prev) => ({
      ...prev,
      [id]: data.description.trim()
        ? [
            {
              id: "desc",
              sender: "customer",
              text: data.description,
              timestamp: new Date().toISOString(),
            },
          ]
        : [],
    }));
  
    // Select new ticket
    setSelectedId(id);
    enqueueSnackbar("Ticket created successfully!", {
        variant: "success",
        autoHideDuration: 1000,
      });
  };
  
  

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        height: "100%",
        flexDirection: isSmall ? "column" : "row",
      }}
    >
      {/* Left: list + toolbar */}
      <Box
        sx={{
          flex: isSmall ? "1 1 100%" : "3 1 0",
          borderRight: isSmall ? "none" : "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
          <TicketListToolbar searchQuery={searchQuery}
  onSearch={setSearchQuery}
  status={statusFilter}
  onStatusChange={setStatusFilter}
  priority={priorityFilter}
  onPriorityChange={setPriorityFilter}/>
        </Box>

        <Box sx={{ flexGrow: 1, position: "relative", minHeight: 0 }}>
          {loading ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={22} sx={{ mr: 1 }} />
              <Typography variant="body2">Loading tickets...</Typography>
            </Box>
          ) : (
            <TicketList
              tickets={filteredTickets}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
          )}

          {/* FAB inside the list area so it doesn't overlap chat */}
          {/* <FloatingActionButton onClick={createNewTicket} /> */}
          <FloatingActionButton onClick={() => setOpenCreateDialog(true)} />

        </Box>
      </Box>

      {/* Right: details + chat */}
      <Box
        sx={{
          flex: isSmall ? "1 1 100%" : "2 1 0",
          bgcolor: "white",
          minWidth: 0,
          borderTop: isSmall ? "1px solid #eee" : "none",
        }}
      >
        <TicketDetailsPanel
          ticket={selectedTicket}
          messages={messagesForSelected}
          onSendMessage={(text) => {
            if (selectedId) handleSendMessage(selectedId, text);
          }}
        />
      </Box>
      <CreateTicketDialog
  open={openCreateDialog}
  onClose={() => setOpenCreateDialog(false)}
  onCreate={handleCreateTicket}
/>

    </Box>
  );
};

export default TicketsPage;
