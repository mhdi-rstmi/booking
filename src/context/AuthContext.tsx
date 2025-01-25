import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthContextType } from '../types';
import data from '../data/data.json';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(data.users);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = (email: string, password: string) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      navigate('/dashboard');
    }
  };

  const register = (userData: Omit<User, 'id' | 'balance'>) => {
    const newUser: User = {
      ...userData,
      id: Math.max(0, ...users.map(u => u.id)) + 1,
      balance: 0
    };
    setUsers([...users, newUser]);
    setUser(newUser);
    navigate('/dashboard');
  };

  const updateUser = (data: { email?: string; password?: string }) => {
    if (!user) return;

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};