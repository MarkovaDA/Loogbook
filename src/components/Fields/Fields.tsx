import {
  Alert,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import type { WorkLogFormValues, WorkType } from '../../types';

interface FieldsProps {
  values: WorkLogFormValues;
  error: string;
  workTypes: WorkType[];
  isWorkTypesLoading?: boolean;
  onChange: (field: keyof WorkLogFormValues, value: string) => void;
}

export function Fields({
  values,
  error,
  workTypes,
  isWorkTypesLoading = false,
  onChange,
}: FieldsProps) {
  const catalogNames = new Set(workTypes.map((item) => item.name));
  const hasCustomWorkType =
    values.workType.length > 0 && !catalogNames.has(values.workType);

  const handleWorkTypeChange = (workTypeName: string) => {
    const selected = workTypes.find((item) => item.name === workTypeName);

    onChange('workType', workTypeName);

    if (selected) {
      onChange('unit', selected.defaultUnit);
    }
  };

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

      <FormControl fullWidth required>
        <InputLabel id="work-type-label">Вид работ</InputLabel>
        <Select
          labelId="work-type-label"
          label="Вид работ"
          value={values.workType}
          onChange={(event) => handleWorkTypeChange(event.target.value)}
          disabled={isWorkTypesLoading}
        >
          <MenuItem value="">
            <em>{isWorkTypesLoading ? 'Загрузка...' : 'Выберите вид работ'}</em>
          </MenuItem>

          {hasCustomWorkType && (
            <MenuItem value={values.workType}>{values.workType}</MenuItem>
          )}

          {workTypes.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
