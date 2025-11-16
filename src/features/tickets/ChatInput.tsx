import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";

const ChatInput = ({ onSend }: { onSend: (msg: string) => void }) => {
  const [value, setValue] = useState("");

  const sendMessage = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        borderTop: "1px solid #eee",
        bgcolor: "white",
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Type a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <IconButton color="primary" onClick={sendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default ChatInput;
