import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [employee, setEmployee] = useState(() => {
    const saved = localStorage.getItem('employee');
    return saved ? JSON.parse(saved) : null;
  });

  
  useEffect(() => {
    if (employee) {
      localStorage.setItem('employee', JSON.stringify(employee));
    } else {
      localStorage.removeItem('employee');
    }
  }, [employee]);

  const login = (empData) => {
    setEmployee(empData);
  };

  const logout = () => {
    setEmployee(null);
  };

  return (
    <AuthContext.Provider value={{ employee, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
