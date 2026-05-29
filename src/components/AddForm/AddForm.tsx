import { useState, type FormEvent } from 'react';
import { Box, Button, Stack } from '@mui/material';
import type { WorkLogFormValues } from '../../types';
import { Fields } from '../Fields';
import {
  EMPTY_VALUES,
  trimFormValues,
  validateFormValues,
} from '../Utils';

interface AddFormProps {
  isSubmitting: boolean;
  onSubmit: (values: WorkLogFormValues) => Promise<void>;
  onCancel: () => void;
}

export function AddForm({ isSubmitting, onSubmit, onCancel }: AddFormProps) {
  const [values, setValues] = useState<WorkLogFormValues>(EMPTY_VALUES);
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
    setValues(EMPTY_VALUES);
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Fields values={values} error={error} onChange={handleChange} />

        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
          <Button type="button" variant="outlined" onClick={onCancel} disabled={isSubmitting}>
            Отмена
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Добавить запись'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
