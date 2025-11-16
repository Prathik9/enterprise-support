# 🚀 Enterprise Support Ticketing System

An enterprise-grade, real-time support ticketing system built using modern web technologies, focusing on **React, TypeScript, Material-UI (MUI)**, and **Redux Toolkit** for robust state management.

## ✨ Features

This system is designed for both scalability and a superior agent experience, featuring real-time updates via WebSockets.

### 📊 Real-Time & Communication
* **Real-Time Updates:** Uses `@stomp/stompjs` to connect to WebSocket endpoints for instant updates.
* **Notifications:** Displays immediate toast notifications (via MUI Snackbar/Notistack) for new tickets, status changes, and new messages.
* **Reconnection Logic:** Handles graceful fallback and reconnection for persistent real-time connections.

### 🎨 UI & UX (Material-UI Focus)
* **Ticket Management UI:** Responsive split-view layout for efficient management.
* **Ticket List:** Includes powerful filtering (Status, Priority, Assignee, Tags), sorting, and pagination.
* **Ticket Detail View:** Chat-style message feed that updates instantly.
* **Metadata Editing:** Agents can edit Priority, Status, and Assignee in the detail view.

### ⚙️ Architecture & Maintainability
* **Language & Typing:** Full project implemented in **TypeScript** for strict type checking and reduced bugs.
* **State Management:** Uses **Redux Toolkit (RTK)** for centralized state, including a custom WebSocket middleware slice for real-time integration.
* **Forms:** Utilizes **`react-hook-form`** integrated with **`zod`** for schema-based validation.
* **Component Structure:** Adheres to the **Atomic Design** principle for highly reusable, atomic components (e.g., `TicketChip`, `ChatBubble`).

---

## 🛠️ Project Setup (Development)

Follow these steps to get the project running on your local machine.

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn
* A running backend API/WebSocket server (details below)

### 1. Clone the Repository

```bash
git clone https://github.com/Prathik9/enterprise-support.git
```
### 2. Install Dependencies
Install all necessary packages, including React, TypeScript, MUI, and Redux Toolkit.
```
npm install
```

### 3. Environment Configuration
Create a .env file in the root directory based on the provided .env.example. This file handles environment-based configuration for scalability.
.env example:

```
AAPI Base URL for REST calls (RTK Query)
API_BASE_URL=http://localhost:8080/api/v1

WebSocket URL for STOMP connection (Real-Time)
WS_URL=ws://localhost:8080/ws/stomp
```
### 4. Run the Application
Start the development server. The application will typically run on http://localhost:5173.
```
npm run dev
```