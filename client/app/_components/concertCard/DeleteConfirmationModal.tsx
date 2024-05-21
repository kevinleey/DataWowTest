import { Modal } from "@mui/base/Modal";
import { styled } from "@mui/system";
import { Backdrop } from "@mui/material";
import { ModalIcon } from "../../_assets/constants";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  concertName: string;
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onDelete,
  concertName,
}: DeleteConfirmationModalProps) {
  return (
    <Modal open={open} onClose={onClose} slots={{ backdrop: StyledBackdrop }}>
      <div className="modal-content">
        {ModalIcon}
        <h3 className="modal-title">
          Are you sure you want to delete?
          <br />
          &quot;{concertName}&quot;
        </h3>
        <div className="modal-footer">
          <button
            onClick={onClose}
            className="button modal-button cancel-button"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="button modal-button concert-card-delete-button"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

const StyledBackdrop = styled(Backdrop)`
  z-index: 1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;
