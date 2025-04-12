import React, { createContext, useContext, useState } from 'react';
import { Emission } from '@/shared/types/db-models';

interface EmissionsContextType {
  emissions: Emission[];
  setEmissions: React.Dispatch<React.SetStateAction<Emission[]>>;
}

const EmissionsContext = createContext<EmissionsContextType | undefined>(undefined);

export const useEmissions = () => {
  const context = useContext(EmissionsContext);
  if (!context) throw new Error("useEmissions debe usarse dentro de EmissionsProvider");
  return context;
};

export const EmissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [emissions, setEmissions] = useState<Emission[]>([]);

  return (
    <EmissionsContext.Provider value={{ emissions, setEmissions }}>
      {children}
    </EmissionsContext.Provider>
  );
};