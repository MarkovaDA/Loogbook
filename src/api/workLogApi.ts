import type { WorkLogEntry, WorkLogFormValues } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
const ENTRIES_URL = `${API_BASE_URL}/entries`;
const STATIC_DATA_URL = '/worklog-static-data.json';

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function normalizeEntry(entry: WorkLogEntry): WorkLogEntry {
  return {
    ...entry,
    id: Number(entry.id),
  };
}

async function loadStaticEntries() {
  const data = await request<{ entries: WorkLogEntry[] }>(STATIC_DATA_URL);
  return data.entries.map(normalizeEntry);
}

export async function getEntries() {
  try {
    const entries = await request<WorkLogEntry[]>(ENTRIES_URL);

    if (entries.length > 0) {
      return entries.map(normalizeEntry);
    }
  } catch {
    // API недоступен — загрузим статические данные ниже
  }

  return loadStaticEntries();
}

export function createEntry(payload: WorkLogFormValues) {
  return request<WorkLogEntry>(ENTRIES_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateEntry(id: number, payload: WorkLogFormValues) {
  return request<WorkLogEntry>(`${ENTRIES_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function deleteEntry(id: number) {
  const response = await fetch(`${ENTRIES_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Ошибка удаления: ${response.status}`);
  }
}
