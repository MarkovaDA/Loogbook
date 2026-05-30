import ConstructionIcon from '@mui/icons-material/Construction';
import {
  Alert,
  AppBar,
  Box,
  CircularProgress,
  Container,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import {
  createEntry,
  deleteEntry,
  getEntries,
  updateEntry,
} from './api/workLogApi';
import { AddFormDialog } from './components/AddForm';
import { EditFormDialog } from './components/EditForm';
import { Table } from './components/Table';
import type { WorkLogEntry, WorkLogFormValues } from './types';

function App() {
  const [entries, setEntries] = useState<WorkLogEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<WorkLogEntry | null>(null);
  const [filterDate, setFilterDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setIsLoading(true);
        const response = await getEntries();
        setEntries(response);
        setError('');
      } catch {
        setError('Не удалось загрузить записи журнала.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadEntries();
  }, []);

  const visibleEntries = useMemo(() => {
    const filtered = filterDate
      ? entries.filter((entry) => entry.date === filterDate)
      : entries;

    return [...filtered].sort((a, b) =>
      sortOrder === 'desc'
        ? b.date.localeCompare(a.date)
        : a.date.localeCompare(b.date),
    );
  }, [entries, filterDate, sortOrder]);

  const handleAdd = async (values: WorkLogFormValues) => {
    try {
      setIsSubmitting(true);
      const created = await createEntry(values);
      setEntries((prev) => [created, ...prev]);
      setError('');
      setIsAddOpen(false);
    } catch {
      setError('Не удалось сохранить запись. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (values: WorkLogFormValues) => {
    if (!editingEntry) {
      return;
    }

    try {
      setIsSubmitting(true);
      const updated = await updateEntry(editingEntry.id, values);
      setEntries((prev) =>
        prev.map((entry) => (entry.id === editingEntry.id ? updated : entry)),
      );
      setEditingEntry(null);
      setError('');
    } catch {
      setError('Не удалось сохранить запись. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (entry: WorkLogEntry) => {
    const approved = window.confirm(
      `Удалить запись "${entry.workType}" от ${entry.date}?`,
    );

    if (!approved) {
      return;
    }

    try {
      await deleteEntry(entry.id);
      setEntries((prev) => prev.filter((item) => item.id !== entry.id));

      if (editingEntry?.id === entry.id) {
        setEditingEntry(null);
      }
      setError('');
    } catch {
      setError('Не удалось удалить запись. Попробуйте снова.');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <ConstructionIcon sx={{ mr: 1.5 }} />
          <Box>
            <Typography variant="h6" component="h1">
              Журнал работ
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Учет выполненных работ на объекте
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3, flexGrow: 1 }}>
        <Stack spacing={3}>
          {error && (
            <Alert severity="error" onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table
              entries={visibleEntries}
              filterDate={filterDate}
              sortOrder={sortOrder}
              onAddClick={() => setIsAddOpen(true)}
              onFilterDateChange={setFilterDate}
              onSortOrderChange={setSortOrder}
              onEdit={setEditingEntry}
              onDelete={handleDelete}
            />
          )}

          <AddFormDialog
            open={isAddOpen}
            isSubmitting={isSubmitting}
            onClose={() => setIsAddOpen(false)}
            onSubmit={handleAdd}
          />

          <EditFormDialog
            open={editingEntry !== null}
            editingEntry={editingEntry}
            isSubmitting={isSubmitting}
            onClose={() => setEditingEntry(null)}
            onSubmit={handleEdit}
          />
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
