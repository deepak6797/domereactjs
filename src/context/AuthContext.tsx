import React, { createContext, useState, ReactNode } from 'react';
import { getCookie } from '../utils/cookie';
import { AUTH_COOKIE_CONFIG } from '../constant/common';

interface AuthContextValues {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContextCreator = createContext<AuthContextValues>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const loginCookie = getCookie(AUTH_COOKIE_CONFIG.loggedInCookie);

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    loginCookie ? true : false,
  );

  const values: AuthContextValues = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AuthContextCreator.Provider value={values}>
      {children}
    </AuthContextCreator.Provider>
  );
};

export default AuthContextProvider;
