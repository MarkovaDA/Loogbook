import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import type { WorkLogFormValues } from '../../types';
import { AddForm } from './AddForm';

interface AddFormDialogProps {
  open: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (values: WorkLogFormValues) => Promise<void>;
}

export function AddFormDialog({
  open,
  isSubmitting,
  onClose,
  onSubmit,
}: AddFormDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Добавление записи</DialogTitle>
      <DialogContent dividers>
        <AddForm
          key={open ? 'open' : 'closed'}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
