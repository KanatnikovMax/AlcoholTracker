import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import { saveUserData, clearUserData, getStoredUserData, getStoredToken  } from '../utils/storage';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        const userData = await saveUserData(result.token);
        setUserToken(result.token);
        setUserInfo(userData);
        return true;
      } else {
        await logout();
        return false;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, email, password) => {
  setIsLoading(true);
  try {
    const result = await registerUser(username, email, password);
    
    if (!result.success || !result.token) {
      await logout();
      return false;
    }

    const userData = await saveUserData(result.token);
    if (!userData) {
      await logout();
      return false;
    }

    setUserToken(result.token);
    setUserInfo(userData);
    return true;
  } finally {
    setIsLoading(false);
  }
};

  const logout = async () => {
    setIsLoading(true);
    try {
      await clearUserData();
      setUserToken(null);
      setUserInfo(null);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      //clearUserData();
      const token = await getStoredToken();
      const userData = await getStoredUserData();

      if (token && userData) {
        const decoded = jwtDecode(token);
        if (decoded) {
          setUserToken(token);
          setUserInfo(userData);
          return true;
        }
      }

      await logout();
      return false;
    } catch (e) {
      console.error('isLoggedIn error:', e);
      await logout();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{
      userToken,
      isLoading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};