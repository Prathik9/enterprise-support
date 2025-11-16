import { Box, Typography } from "@mui/material";

type Props = {
  status: "Connected" | "Disconnected";
};

const ConnectionStatus = ({ status }: Props) => {
  const isOnline = status === "Connected";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        px: 1.5,
        py: 0.5,
        borderRadius: 20,
        bgcolor: "rgba(255,255,255,0.15)",
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          mr: 1,
          bgcolor: isOnline ? "limegreen" : "grey.500",
        }}
      />
      <Typography variant="body2">{status}</Typography>
    </Box>
  );
};

export default ConnectionStatus;
