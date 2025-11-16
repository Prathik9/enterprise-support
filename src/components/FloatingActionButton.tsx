import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  onClick: () => void;
};

const FloatingActionButton = ({ onClick }: Props) => (
  <Fab
    color="primary"
    onClick={onClick}
    sx={{
        position: "absolute",
        bottom: 20,
        right: 20,
      }}
      
  >
    <AddIcon />
  </Fab>
);

export default FloatingActionButton;
