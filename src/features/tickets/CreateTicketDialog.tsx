import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Stack,
  } from "@mui/material";
  import { useState } from "react";
  
  type Props = {
    open: boolean;
    onClose: () => void;
    onCreate: (ticket: {
      subject: string;
      customerName: string;
      priority: string;
      description: string;
    }) => void;
  };
  
  const CreateTicketDialog = ({ open, onClose, onCreate }: Props) => {
    const [subject, setSubject] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [priority, setPriority] = useState("medium");
    const [description, setDescription] = useState("");
  
    const handleSubmit = () => {
      if (!subject.trim() || !customerName.trim()) return;
  
      onCreate({
        subject,
        customerName,
        priority,
        description,
      });
  
      // Reset form
      setSubject("");
      setCustomerName("");
      setPriority("medium");
      setDescription("");
  
      onClose();
    };
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New Ticket</DialogTitle>
  
        <DialogContent dividers>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Ticket Subject"
              fullWidth
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
  
            <TextField
              label="Customer Name"
              fullWidth
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
  
            <TextField
              label="Priority"
              select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </TextField>
  
            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
  
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default CreateTicketDialog;
  