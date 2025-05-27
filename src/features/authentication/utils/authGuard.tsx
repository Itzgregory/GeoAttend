import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { isAuthenticated, getUserRole } from './authUtils';

type RootStackParamList = {
  '/main/authentication/login': undefined;
  '/errors/unauthorized': undefined;
};

type AuthGuardProps = {
  children: React.ReactNode;
  requiredRole?: string;
  tokenRedirectTo?: keyof RootStackParamList;
  roleRedirectTo?: keyof RootStackParamList;
};

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredRole,
  tokenRedirectTo = '/main/authentication/login',
  roleRedirectTo = '/errors/unauthorized',
}) => {
  const [authStatus, setAuthStatus] = useState<'checking' | 'authorized' | 'tokenExpired' | 'unauthorized'>('checking');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    let isMounted = true;

    const verifyAccess = async () => {
      try {
        const authenticated = isAuthenticated(); 
        if (!isMounted) return;

        if (!authenticated) {
          setAuthStatus('tokenExpired');
          navigation.navigate(tokenRedirectTo);
          return;
        }

        if (requiredRole) {
          const userRole = await getUserRole(); // Async due to AsyncStorage expiry check
          if (!isMounted) return;

          if (userRole !== requiredRole) {
            setAuthStatus('unauthorized');
            navigation.navigate(roleRedirectTo);
            return;
          }
        }

        if (isMounted) {
          setAuthStatus('authorized');
        }
      } catch (error) {
        console.error('AuthGuard verification failed:', error);
        if (isMounted) {
          setAuthStatus('tokenExpired');
          navigation.navigate(tokenRedirectTo);
        }
      }
    };

    verifyAccess();
    const interval = setInterval(verifyAccess, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [navigation, requiredRole, tokenRedirectTo, roleRedirectTo]);

  if (authStatus === 'checking') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (authStatus === 'authorized') {
    return <>{children}</>;
  }

  return null; 
};