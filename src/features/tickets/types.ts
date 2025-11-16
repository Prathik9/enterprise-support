export type TicketStatus = "open" | "pending" | "closed";
export type TicketPriority = "low" | "medium" | "high";

export interface TicketMessage {
  id: string;
  from: "customer" | "agent";
  text: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  customerName: string;
  createdAt: string;
  status: TicketStatus;
  priority: TicketPriority;
  messages: TicketMessage[];
}
export interface ChatMessage {
    id: string;
    sender: "agent" | "customer";
    text: string;
    timestamp: string;
  }