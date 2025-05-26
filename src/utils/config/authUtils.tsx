import AsyncStorage from '@react-native-async-storage/async-storage';


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
  expiresIn: number = 3600000
): Promise<void> => {
  if (!id || !token) {
    return;
  }

  try {
    const users = await getUsers();
    users[id] = {
      token,
      role,
      expiry: Date.now() + expiresIn,
      firstName,
      lastName,
      email,
    };

    // Set all items
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.USERS, JSON.stringify(users)],
      [STORAGE_KEYS.ACTIVE_USER, id],
      [STORAGE_KEYS.USER_ID, id],
    ]);

    console.log('Auth token set successfully for user:', id);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const activeUser = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    if (!activeUser) {
      return null;
    }

    const users = await getUsers();
    return users[activeUser]?.token || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const getUserRole = async (): Promise<string | null> => {
  try {
    const activeUser = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    if (!activeUser) {
      return null;
    }

    const users = await getUsers();
    return users[activeUser]?.role || null;
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  }
};

export const getUserDetails = async (): Promise<UserSession | null> => {
  try {
    const activeUser = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    if (!activeUser) {
      return null;
    }

    const users = await getUsers();
    return users[activeUser] || null;
  } catch (error) {
    console.error('Error getting user details:', error);
    return null;
  }
};

export const isTokenValid = async (): Promise<boolean> => {
  try {
    const users = await getUsers();
    const activeUser = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
    
    if (!activeUser || !users[activeUser]) {
      return false;
    }

    const { token, expiry } = users[activeUser];
    if (!token) {
      return false;
    }

    const isValid = typeof expiry === "number" && Date.now() < expiry;
    
    if (!isValid) {
      console.log('Token expired');
    } else if (Date.now() > expiry - 300000) {
      console.log('Token expiring soon');
    }

    return isValid;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

export const switchUser = async (id: string): Promise<boolean> => {
  try {
    const users = await getUsers();
    if (users[id]) {
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.ACTIVE_USER, id],
        [STORAGE_KEYS.USER_ID, id],
      ]);
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
      // Clear specific user
      const users = await getUsers();
      delete users[id];
      await setUsers(users);
      
      const activeUser = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
      if (activeUser === id) {
        const remainingUsers = Object.keys(users);
        if (remainingUsers.length > 0) {
          await AsyncStorage.multiSet([
            [STORAGE_KEYS.ACTIVE_USER, remainingUsers[0]],
            [STORAGE_KEYS.USER_ID, remainingUsers[0]],
          ]);
        } else {
          await AsyncStorage.multiRemove([
            STORAGE_KEYS.ACTIVE_USER,
            STORAGE_KEYS.USER_ID,
          ]);
        }
      }
    } else {
      // Clear all auth data
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USERS,
        STORAGE_KEYS.ACTIVE_USER,
        STORAGE_KEYS.USER_ID,
        'user',
        'userRole',
      ]);
    }
    
    console.log('Auth data cleared');
  } catch (error) {
    console.error('Error clearing auth data:', error);
  }
};

// Utility function to check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAuthToken();
  const valid = await isTokenValid();
  return !!(token && valid);
};


export const getCurrentUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.ACTIVE_USER);
  } catch (error) {
    console.error('Error getting current user ID:', error);
    return null;
  }
};