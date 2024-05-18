import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ConcertSnackbarProps {
  open: boolean;
  action: any;
  onClose: () => void;
}

export default function ConcertSnackbar({
  open,
  action,
  onClose,
}: ConcertSnackbarProps) {
  const message =
    action === "created"
      ? "Created successfully"
      : action === "deleted"
        ? "Deleted successfully"
        : "";

  return (
    <div>
      <Snackbar
        className="concert-snackbar"
        open={open}
        onClose={onClose}
        TransitionProps={{
          appear: false,
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={onClose} severity="success" variant="outlined">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
