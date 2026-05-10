import React, { createContext, useContext, useState, useCallback } from 'react';

interface DropdownContextValue {
  openDropdownId: string | null;
  openDropdown: (id: string) => void;
  closeAll: () => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export function DropdownProvider({ children }: { children: React.ReactNode }) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const openDropdown = useCallback((id: string) => {
    setOpenDropdownId((current) => (current === id ? null : id));
  }, []);

  const closeAll = useCallback(() => {
    setOpenDropdownId(null);
  }, []);

  return (
    <DropdownContext.Provider value={{ openDropdownId, openDropdown, closeAll }}>
      {children}
    </DropdownContext.Provider>
  );
}

export function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdownContext must be used within DropdownProvider');
  }
  return context;
}
