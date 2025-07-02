import React, { createContext, useState, useContext } from 'react';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employeeInfo, setEmployeeInfo] = useState({ greeting: '', name: '' });

  return (
    <EmployeeContext.Provider value={{ employeeInfo, setEmployeeInfo }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => useContext(EmployeeContext);
