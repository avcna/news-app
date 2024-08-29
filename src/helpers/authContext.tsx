import { createContext } from 'react';

interface AuthContextType {
  setAndGetTokens: (token: string | null, name: string | null) => void;
  authToken: string | null;
  name: string | null;
}

const defaultContextValue: AuthContextType = {
  setAndGetTokens: () => {},
  authToken: null,
  name: null,
};

export const AuthContext = createContext<AuthContextType>(defaultContextValue);
