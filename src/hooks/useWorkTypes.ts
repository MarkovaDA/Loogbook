import { useEffect, useState } from 'react';
import { getWorkTypes } from '../api/workTypesApi';
import type { WorkType } from '../types';

export function useWorkTypes() {
  const [workTypes, setWorkTypes] = useState<WorkType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkTypes = async () => {
      try {
        setIsLoading(true);
        const items = await getWorkTypes();
        setWorkTypes(items);
      } catch {
        setWorkTypes([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadWorkTypes();
  }, []);

  return { workTypes, isLoading };
}