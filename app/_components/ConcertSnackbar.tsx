import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

interface ConcertSnackbarProps {
  open: boolean;
  onClose: () => void;
}

export default function ConcertSnackbar({
  open,
  onClose,
}: ConcertSnackbarProps) {
  return (
    <div>
      <Snackbar
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={onClose} severity="success" variant="outlined">
          Created successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
