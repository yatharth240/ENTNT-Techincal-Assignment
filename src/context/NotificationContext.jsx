import { createContext, useState } from 'react';
import { v4 as uuid } from 'uuid';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifs, setNotifs] = useState([]);

  function push(message) {
    setNotifs(n => [...n, { id: uuid(), message }]);
  }
  function dismiss(id) {
    setNotifs(n => n.filter(x => x.id !== id));
  }

  return (
    <NotificationContext.Provider value={{ notifs, push, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
}
