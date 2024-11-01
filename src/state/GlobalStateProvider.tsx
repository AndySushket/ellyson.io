// app/GlobalStateProvider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Тип для состояния: объект с произвольными ключами и значениями любого типа
type GlobalStateType = Record<string, any>;

// Тип контекста
type GlobalStateContextType = {
  state: GlobalStateType;
  setState: (newState: GlobalStateType) => void;
  updateState: (key: string, value: any) => void; // Дополнительная функция для обновления по ключу
};

// Создаем контекст
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Провайдер контекста
export function GlobalStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GlobalStateType>({ location: usePathname() });

  // Функция для обновления состояния по ключу
  const updateState = (key: string, value: any) => {
    setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <GlobalStateContext.Provider value={{ state, setState, updateState }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// Хук для использования контекста
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
