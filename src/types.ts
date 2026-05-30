export interface WorkLogEntry {
  id: number;
  date: string;
  workType: string;
  volume: string;
  unit: string;
  performer: string;
}

export type WorkLogFormValues = Omit<WorkLogEntry, 'id'>;

export interface WorkType {
  id: number;
  name: string;
  defaultUnit: string;
}
