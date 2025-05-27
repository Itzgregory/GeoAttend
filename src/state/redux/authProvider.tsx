import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeAuth } from './authSlice';
import type { AppDispatch } from './store'; 

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;