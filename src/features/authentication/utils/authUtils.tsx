import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../../../state/redux/store';
import { loginSuccess, logout as logoutAction } from '../../../state/redux/authSlice'; 
import { User } from '../../../state/type/redux/AuthSliceType'; 

export type UserSession = {
  token: string;
  role: string;
  expiry: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};

const STORAGE_KEYS = {
  USERS: 'users',
  ACTIVE_USER: 'activeUser',
  USER_ID: 'userId',
};

const TOKEN_EXPIRY = 12 * 60 * 60 * 1000; 

const getUsers = async (): Promise<Record<string, UserSession>> => {
  try {
    const users = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : {};
  } catch (error) {
    console.error('Error getting users from storage:', error);
    return {};
  }
};

const setUsers = async (users: Record<string, UserSession>): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (error) {
    console.error('Error setting users in storage:', error);
  }
};

export const setAuthToken = async (
  id: string,
  token: string,
  role: string,
  firstName: string,
  lastName: string,
  email: string,
  expiresIn: number = TOKEN_EXPIRY
): Promise<void> => {
  if (!id || !token) return;

  // Clear existing session
  await clearAuthData();

  // Persist to AsyncStorage
  const users = await getUsers();
  users[id] = {
    token,
    role,
    expiry: Date.now() + expiresIn,
    firstName,
    lastName,
    email,
  };
  await AsyncStorage.multiSet([
    [STORAGE_KEYS.USERS, JSON.stringify(users)],
    [STORAGE_KEYS.ACTIVE_USER, id],
    [STORAGE_KEYS.USER_ID, id],
  ]);

  // Update Redux store
  const user: User = { id, email, firstName, lastName };
  store.dispatch(loginSuccess({ user, token, role }));
};

export const getAuthToken = (): string | null => {
  // Get token from Redux store
  return store.getState().auth.token;
};

export const getUserRole = (): string | null => {
  // Get role from Redux store
  return store.getState().auth.role;
};

export const getUserDetails = (): UserSession | null => {
  // Get user details from Redux store
  const { user, token, role } = store.getState().auth;
  if (!user || !token || !role) return null;
  return {
    token,
    role,
    expiry: Date.now() + TOKEN_EXPIRY,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
};

export const isTokenValid = async (): Promise<boolean> => {
  try {
    const token = getAuthToken();
    if (!token) return false;

    const activeUser = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    if (!activeUser) return false;

    const users = await getUsers();
    const user = users[activeUser];
    if (!user?.token) return false;

    const isValid = Date.now() < user.expiry;
    if (!isValid) await clearAuthData();

    return isValid;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

export const logout = async (): Promise<void> => {
  await clearAuthData();
  store.dispatch(logoutAction());
};

export const switchUser = async (id: string): Promise<boolean> => {
  try {
    const users = await getUsers();
    if (users[id]) {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.ACTIVE_USER, id],
        [STORAGE_KEYS.USER_ID, id],
      ]);
      // Update Redux store with new user data
      const { token, role, firstName, lastName, email } = users[id];
      const user: User = { 
        id, 
        email: email ?? '', 
        firstName: firstName ?? '', 
        lastName: lastName ?? '' 
      };
      store.dispatch(loginSuccess({ user, token, role }));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error switching user:', error);
    return false;
  }
};

export const clearAuthData = async (id: string | null = null): Promise<void> => {
  try {
    if (id) {
      const users = await getUsers();
      delete users[id];
      await setUsers(users);
      const activeUser = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
      if (activeUser === id) {
        await AsyncStorage.multiRemove([
          STORAGE_KEYS.ACTIVE_USER,
          STORAGE_KEYS.USER_ID,
        ]);
      }
    } else {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USERS,
        STORAGE_KEYS.ACTIVE_USER,
        STORAGE_KEYS.USER_ID,
      ]);
    }
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken(); // Check Redux store for token
};

export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
  } catch (error) {
    console.error('Error getting current user ID:', error);
    return null;
  }
};

let authCheckInterval: NodeJS.Timeout | null = null;

export const startAuthListener = (onInvalidToken: () => void, checkInterval = 5 * 60 * 1000) => {
  if (authCheckInterval) {
    clearInterval(authCheckInterval);
  }
  authCheckInterval = setInterval(async () => {
    const isValid = await isTokenValid();
    if (!isValid) {
      onInvalidToken();
    }
  }, checkInterval);
};

export const stopAuthListener = () => {
  if (authCheckInterval) {
    clearInterval(authCheckInterval);
    authCheckInterval = null;
  }
};