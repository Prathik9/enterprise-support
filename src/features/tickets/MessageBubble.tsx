import { Box, Typography } from "@mui/material";

const MessageBubble = ({
  text,
  sender,
  time,
}: {
  text: string;
  sender: "customer" | "agent";
  time: string;
}) => {
  const isAgent = sender === "agent";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isAgent ? "flex-end" : "flex-start",
        width: "100%",
        mb: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: "70%",
          bgcolor: isAgent ? "#1976d2" : "#f1f1f1",
          color: isAgent ? "white" : "black",
          p: 1.5,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="body2">{text}</Typography>

        <Typography
          variant="caption"
          sx={{ opacity: 0.7, display: "block", mt: 0.5, textAlign: "right" }}
        >
          {new Date(time).toLocaleTimeString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageBubble;
