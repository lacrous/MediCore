import { useCallback } from 'react';
import { useDropdownContext } from '@/context/DropdownContext';

let idCounter = 0;

export function useDropdown() {
  const { openDropdownId, openDropdown, closeAll } = useDropdownContext();

  const getDropdownId = useCallback(() => {
    idCounter += 1;
    return `dropdown-${idCounter}`;
  }, []);

  return {
    openDropdownId,
    openDropdown,
    closeAll,
    getDropdownId,
  };
}
