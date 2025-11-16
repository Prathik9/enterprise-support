import type { Ticket } from "./types";

export const mockTickets: Ticket[] = [
  {
    id: "1",
    subject: "Login issue on production",
    customerName: "Acme Corp",
    createdAt: "2025-11-15T09:30:00Z",
    status: "open",
    priority: "high",
    messages: [
      {
        id: "m1",
        from: "customer",
        text: "Our users are unable to log in since morning.",
        createdAt: "2025-11-15T09:31:00Z",
      },
      {
        id: "m2",
        from: "agent",
        text: "We are looking into this. Can you share sample user IDs?",
        createdAt: "2025-11-15T09:35:00Z",
      },
    ],
  },
  {
    id: "2",
    subject: "Billing discrepancy for October",
    customerName: "Globex Inc.",
    createdAt: "2025-11-14T15:10:00Z",
    status: "pending",
    priority: "medium",
    messages: [
      {
        id: "m1",
        from: "customer",
        text: "Invoice amount seems higher than usage.",
        createdAt: "2025-11-14T15:15:00Z",
      },
    ],
  },
  {
    id: "3",
    subject: "Feature request: export reports as CSV",
    customerName: "Initech",
    createdAt: "2025-11-10T08:00:00Z",
    status: "closed",
    priority: "low",
    messages: [
      {
        id: "m1",
        from: "agent",
        text: "We’ve added this to our roadmap. You’ll be notified once available.",
        createdAt: "2025-11-10T08:10:00Z",
      },
    ],
  },
];
