export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}


export interface AuthState {
  user: User | null;
  token: string | null;
  role: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
  loading: false,
  error: null,
};