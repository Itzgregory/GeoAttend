import axios from "axios";
import { getAuthToken, isTokenValid, clearAuthData } from "../../features/authentication/utils/authUtils";

const API_BASE_URL = 'https://dev-geoattend.onrender.com/api'; 

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, 
});

// Tracking 401 errors to prevent infinite redirect loops
let isRefreshing = false;

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    const valid = await isTokenValid();
    
    if (token && valid) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      const errorMessage = error.response.data?.message?.toLowerCase() || "";
      const isTokenIssue =
        errorMessage.includes("token expired") ||
        errorMessage.includes("invalid token") ||
        errorMessage.includes("authentication failed");
      
      if (isTokenIssue && !originalRequest._retry && !isRefreshing) {
        isRefreshing = true;
        await clearAuthData();
        
        // In React Native, you'll handle navigation differently
        // You might want to emit an event or use a navigation service
        // For now, we'll just clear the data and let the app handle it
        console.log("Authentication expired - user needs to re-login");
        
        // You can dispatch a custom event or use a state management solution
        // to handle navigation to login screen
        
      } else if (!isTokenIssue) {
        originalRequest._retry = true;
      }
    }
    
    isRefreshing = false;
    return Promise.reject(error);
  }
);

export default axiosInstance;
