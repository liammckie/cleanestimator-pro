import React, { createContext, useContext, useState } from 'react';

interface SettingsContextType {
  awardIncrease: number;
  setAwardIncrease: (increase: number) => void;
  updateLaborCosts: (hourlyRate: number) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [awardIncrease, setAwardIncrease] = useState(0);

  const updateLaborCosts = (hourlyRate: number) => {
    return hourlyRate * (1 + (awardIncrease / 100));
  };

  return (
    <SettingsContext.Provider value={{ awardIncrease, setAwardIncrease, updateLaborCosts }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};