"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { getUserById } from '@/services/userService';
import type { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
      const decoded = decodeToken(storedToken);
      if (decoded?.userId) {
        getUserById(decoded.userId)
          .then((fullUser) => setUser({ ...decoded, ...fullUser }))
          .catch(() => setUser(decoded));
      } else {
        setUser(decoded);
      }
    }
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    Cookies.set('token', newToken, { expires: 7 }); // 7 días de expiración
    const decoded = decodeToken(newToken);
    if (decoded?.userId) {
      try {
        const fullUser = await getUserById(decoded.userId);
        setUser({ ...decoded, ...fullUser });
      } catch {
        setUser(decoded);
      }
    } else {
      setUser(decoded);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove('token');
  };

  function decodeToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: payload.userId,
        email: payload.email,
        esAdmin: payload.esAdmin,
        estado: payload.estado,
      };
    } catch {
      return null;
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};
