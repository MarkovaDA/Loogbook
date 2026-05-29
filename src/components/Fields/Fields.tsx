import { Alert, Grid, Stack, TextField } from '@mui/material';
import type { WorkLogFormValues } from '../../types';

interface FieldsProps {
  values: WorkLogFormValues;
  error: string;
  onChange: (field: keyof WorkLogFormValues, value: string) => void;
}

export function Fields({ values, error, onChange }: FieldsProps) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Дата выполнения"
        type="date"
        required
        fullWidth
        value={values.date}
        onChange={(event) => onChange('date', event.target.value)}
        slotProps={{ inputLabel: { shrink: true } }}
      />

      <TextField
        label="Вид работ"
        required
        fullWidth
        placeholder="Например, Монтаж опалубки"
        value={values.workType}
        onChange={(event) => onChange('workType', event.target.value)}
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Объем"
            required
            fullWidth
            placeholder="24"
            value={values.volume}
            onChange={(event) => onChange('volume', event.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Ед. изм."
            required
            fullWidth
            placeholder="м³"
            value={values.unit}
            onChange={(event) => onChange('unit', event.target.value)}
          />
        </Grid>
      </Grid>

      <TextField
        label="ФИО исполнителя"
        required
        fullWidth
        placeholder="Иванов Иван Иванович"
        value={values.performer}
        onChange={(event) => onChange('performer', event.target.value)}
      />

      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
}
