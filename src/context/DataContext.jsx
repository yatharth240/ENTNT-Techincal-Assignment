import { createContext, useReducer, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuid } from 'uuid';

export const DataContext = createContext();

const initialState = {
  equipment: [],
  orders: [],
  maintenance: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_EQUIPMENT':
      return { ...state, equipment: [...state.equipment, { id: uuid(), ...action.payload }] };
    
    case 'DELETE_EQUIPMENT':
      return { ...state, equipment: state.equipment.filter(e => e.id !== action.payload) };
    
    case 'ADD_MAINTENANCE':
      return { ...state, maintenance: [...state.maintenance, { id: uuid(), ...action.payload }] };
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [persisted, setPersisted] = useLocalStorage('data', initialState);
  const [state, dispatch] = useReducer(reducer, persisted);

  // keep localStorage synced
  useEffect(() => setPersisted(state), [state]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}
