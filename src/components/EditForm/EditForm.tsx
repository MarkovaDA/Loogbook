import { useState, type FormEvent } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import type { WorkLogEntry, WorkLogFormValues } from '../../types';
import { useWorkTypes } from '../../hooks/useWorkTypes';
import { Fields } from '../Fields';
import { trimFormValues, validateFormValues } from '../Utils';

interface EditFormProps {
  editingEntry: WorkLogEntry;
  isSubmitting: boolean;
  onSubmit: (values: WorkLogFormValues) => Promise<void>;
  onCancelEdit: () => void;
}

export function EditForm({
  editingEntry,
  isSubmitting,
  onSubmit,
  onCancelEdit,
}: EditFormProps) {
  const { workTypes, isLoading: isWorkTypesLoading } = useWorkTypes();
  const [values, setValues] = useState<WorkLogFormValues>({
    date: editingEntry.date,
    workType: editingEntry.workType,
    volume: editingEntry.volume,
    unit: editingEntry.unit,
    performer: editingEntry.performer,
  });
  const [error, setError] = useState('');

  const handleChange = (field: keyof WorkLogFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateFormValues(values);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    await onSubmit(trimFormValues(values));
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Редактирование записи
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <Fields
            values={values}
            error={error}
            workTypes={workTypes}
            isWorkTypesLoading={isWorkTypesLoading}
            onChange={handleChange}
          />

          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={onCancelEdit}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}
