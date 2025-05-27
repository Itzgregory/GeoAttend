import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setAuthToken, clearAuthData, getAuthToken } from "../../features/authentication/utils/authUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"; 
import { initialState, User } from "../type/redux/AuthSliceType";



export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, thunkAPI) => {
    try {
      const token = await getAuthToken();
      if (token) {
        // Decode the token to extract user data... JWT
        const decoded: { sub: string; email: string; role: string; firstName?: string; lastName?: string } = jwtDecode(token);
        const user: User = {
          id: decoded.sub,
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
        };
        return { token, user, role: decoded.role };
      }
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to initialize authentication");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ user: User; token: string; role: string }>) {
      const { user, token, role } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
      state.loading = false;
      setAuthToken(user.id, token, role, user.firstName || "", user.lastName || "", user.email, 12 * 60 * 60 * 1000);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      clearAuthData();
    },
    
    logout(state) {
      state.user = null;
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = null;
      clearAuthData();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.role = action.payload.role;
        }
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;