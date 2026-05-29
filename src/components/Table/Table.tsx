import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import type { WorkLogEntry } from '../../types';

interface TableProps {
  entries: WorkLogEntry[];
  filterDate: string;
  sortOrder: 'asc' | 'desc';
  onAddClick: () => void;
  onFilterDateChange: (value: string) => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
  onEdit: (entry: WorkLogEntry) => void;
  onDelete: (entry: WorkLogEntry) => Promise<void>;
}

export function Table({
  entries,
  filterDate,
  sortOrder,
  onAddClick,
  onFilterDateChange,
  onSortOrderChange,
  onEdit,
  onDelete,
}: TableProps) {
  return (
    <Paper elevation={2}>
      <Box
        sx={{
          px: 2,
          py: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'grey.50',
        }}
      >
        <Button variant="contained" size="small" onClick={onAddClick}>
          Добавить запись
        </Button>
      </Box>

      <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Записи журнала
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 2, alignItems: { xs: 'stretch', sm: 'center' } }}
      >
        <TextField
          label="Фильтр по дате"
          type="date"
          size="small"
          value={filterDate}
          onChange={(event) => onFilterDateChange(event.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{ minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="sort-order-label">Сортировка</InputLabel>
          <Select
            labelId="sort-order-label"
            label="Сортировка"
            value={sortOrder}
            onChange={(event) =>
              onSortOrderChange(event.target.value as 'asc' | 'desc')
            }
          >
            <MenuItem value="desc">Сначала новые</MenuItem>
            <MenuItem value="asc">Сначала старые</MenuItem>
          </Select>
        </FormControl>

        {filterDate && (
          <Box sx={{ alignSelf: 'center' }}>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => onFilterDateChange('')}
            >
              Сбросить фильтр
            </Typography>
          </Box>
        )}
      </Stack>

      <TableContainer>
        <MuiTable size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Вид работ</TableCell>
              <TableCell>Объем</TableCell>
              <TableCell>Исполнитель</TableCell>
              <TableCell align="right">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                    Нет записей по выбранному фильтру.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              entries.map((entry) => (
                <TableRow key={entry.id} hover>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.workType}</TableCell>
                  <TableCell>
                    {entry.volume} {entry.unit}
                  </TableCell>
                  <TableCell>{entry.performer}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Редактировать">
                      <IconButton
                        color="primary"
                        aria-label="редактировать"
                        onClick={() => onEdit(entry)}
                      >
                        <EditOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                      <IconButton
                        color="error"
                        aria-label="удалить"
                        onClick={() => void onDelete(entry)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      </Box>
    </Paper>
  );
}
