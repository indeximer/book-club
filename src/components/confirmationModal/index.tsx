import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  title: string;
}

export function ConfirmationModal({
  isOpen,
  onConfirm,
  onClose,
  title,
}: ConfirmationModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Certifique-se de que deseja continuar com esta ação, pois ela não pode
          ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="error" variant="contained">
          Confirmar
        </Button>
        <Button onClick={onClose} autoFocus>
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
