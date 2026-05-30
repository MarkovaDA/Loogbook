import type { WorkType } from '../types';

const WORK_TYPES_URL = `${import.meta.env.BASE_URL}work-types.json`;

export async function getWorkTypes(): Promise<WorkType[]> {
  const response = await fetch(WORK_TYPES_URL);

  if (!response.ok) {
    throw new Error(`Не удалось загрузить справочник видов работ: ${response.status}`);
  }

  const data = (await response.json()) as { workTypes: WorkType[] };
  return data.workTypes;
}
