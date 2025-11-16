import { Box, Chip, TextField, Typography, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";

type Props = {
  searchQuery: string;
  onSearch: (val: string) => void;

  status: string;
  onStatusChange: (val: string) => void;

  priority: string;
  onPriorityChange: (val: string) => void;
};

const TicketListToolbar = ({
  searchQuery,
  onSearch,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
}: Props) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const STATUS_OPTIONS = [
    { label: "All", value: "all" },
    { label: "Open", value: "open" },
    { label: "Pending", value: "pending" },
    { label: "Closed", value: "closed" },
  ];

  const PRIORITY_OPTIONS = [
    { label: "All", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmall ? "column" : "row",
        gap: 2,
        flexWrap: "wrap",
        width: "100%",
      }}
    >
      {/* SEARCH */}
      <TextField
        size="small"
        fullWidth
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search tickets..."
        InputProps={{
          startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
        }}
        sx={{
          minWidth: isSmall ? "100%" : "260px",
        }}
      />

      {/* STATUS FILTER */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {!isSmall && (
          <Typography variant="caption" sx={{ mr: 1, mt: 0.7 }}>
            Status:
          </Typography>
        )}
        {STATUS_OPTIONS.map((s) => (
          <Chip
            key={s.value}
            label={s.label}
            size="small"
            variant={status === s.value ? "filled" : "outlined"}
            color={status === s.value ? "primary" : "default"}
            onClick={() => onStatusChange(s.value)}
          />
        ))}
      </Box>

      {/* PRIORITY FILTER */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {!isSmall && (
          <Typography variant="caption" sx={{ mr: 1, mt: 0.7 }}>
            Priority:
          </Typography>
        )}
        {PRIORITY_OPTIONS.map((p) => (
          <Chip
            key={p.value}
            label={p.label}
            size="small"
            variant={priority === p.value ? "filled" : "outlined"}
            color={priority === p.value ? "secondary" : "default"}
            onClick={() => onPriorityChange(p.value)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TicketListToolbar;
