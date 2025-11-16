import { Chip, Box } from "@mui/material";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const FilterChipSelect = ({ label, options, value, onChange }: Props) => {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      {options.map((opt) => (
        <Chip
          key={opt.value}
          label={opt.label}
          variant={value === opt.value ? "filled" : "outlined"}
          size="small"
          onClick={() => onChange(opt.value)}
        />
      ))}
    </Box>
  );
};

export default FilterChipSelect;
