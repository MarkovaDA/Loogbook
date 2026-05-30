import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { WorkLogEntry, WorkLogFormValues } from '../../types';
import { EditForm } from './EditForm';

interface EditFormDialogProps {
  open: boolean;
  editingEntry: WorkLogEntry | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: WorkLogFormValues) => Promise<void>;
}

export function EditFormDialog({
  open,
  editingEntry,
  isSubmitting,
  onClose,
  onSubmit,
}: EditFormDialogProps) {
  if (!editingEntry) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактирование записи</DialogTitle>
      <DialogContent dividers>
        <EditForm
          key={editingEntry.id}
          editingEntry={editingEntry}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
