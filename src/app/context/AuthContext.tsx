import { createContext, useContext, useState, type ReactNode } from 'react';
import { api, type ApiRole, type AuthUser } from '../lib/api';

interface AuthContextValue {
  user: AuthUser | null;
  login: (username: string, password: string, role: ApiRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('edutest_user');
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const login = async (username: string, password: string, role: ApiRole) => {
    const { token, user: authUser } = await api.login(username, password, role);
    api.setToken(token);
    localStorage.setItem('edutest_user', JSON.stringify(authUser));
    setUser(authUser);
  };

  const logout = () => {
    api.setToken(null);
    localStorage.removeItem('edutest_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth AuthProvider ichida ishlatilishi kerak');
  return ctx;
}
