import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ROLES: ADMINISTRADOR, PASTOR, LIDER, AUXILIAR
  const [user, setUser] = useState({
    name: 'Juan Developer',
    role: 'ADMINISTRADOR', 
    email: 'admin@iglesia.com'
  });

  const logout = () => {
    setUser(null);
  };

  // Helper para verificar permisos
  const hasRole = (roles) => {
    return roles.includes(user?.role);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
