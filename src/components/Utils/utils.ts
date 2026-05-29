import type { WorkLogFormValues } from '../../types';

export function getDefaultAddFormValues(): WorkLogFormValues {
  return {
    date: new Date().toLocaleDateString('en-CA'),
    workType: '',
    volume: '',
    unit: '',
    performer: '',
  };
}

export const EMPTY_VALUES: WorkLogFormValues = getDefaultAddFormValues();

export function validateFormValues(values: WorkLogFormValues): string | null {

  if (
    !values.date.trim() ||
    !values.workType.trim() ||
    !values.volume.trim() ||
    !values.unit.trim() ||
    !values.performer.trim()
  ) {
    return 'Заполните все обязательные поля.';
  }

  return null;
}

export function trimFormValues(values: WorkLogFormValues): WorkLogFormValues {
  return {
    date: values.date,
    workType: values.workType.trim(),
    volume: values.volume.trim(),
    unit: values.unit.trim(),
    performer: values.performer.trim(),
  };
}
