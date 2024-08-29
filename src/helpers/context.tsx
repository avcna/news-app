import React, { useContext, useState, ReactNode } from 'react';
import { AuthContext } from './authContext'; 

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const isAnyToken = JSON.parse(localStorage.getItem("token") || "null");
  const displayName = JSON.parse(localStorage.getItem("name") || "null");
  
  const [authToken, setAuthToken] = useState<string | null>(isAnyToken);
  const [name, setName] = useState<string | null>(displayName);

  const setAndGetTokens = (token: string | null, name: string | null) => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("name", JSON.stringify(name));
    setAuthToken(token);
    setName(name);
  };

  return (
    <AuthContext.Provider value={{ setAndGetTokens, authToken, name }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
