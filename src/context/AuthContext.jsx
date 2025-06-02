import { createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = createContext();

const USERS = [
  { id: 1, email: 'admin@entnt.in', password: 'admin123', role: 'Admin' },
  { id: 2, email: 'staff@entnt.in', password: 'staff123', role: 'Staff' },
  { id: 3, email: 'cust@entnt.in',  password: 'cust123',  role: 'Customer' }
];

export function AuthProvider({ children }) {
  const [session, setSession] = useLocalStorage('session', null);

  function login(email, password) {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (found) setSession({ ...found, token: crypto.randomUUID() });
    return !!found;
  }

  function logout() {
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
