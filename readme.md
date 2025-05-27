** in the app router folder, when there is no _layout.jsx/tsx file, expo would render the files there, just like how next 18 renders items.

** the layout file must have something called slot for it to render everything in its directory

** We would use redux for authentication
** zustand for location updates, to eliminates re-renders
** the both will connect to web socket to provide real time data
** maybe i would use react queries to handle ws reconnections
** then context would be used to in certain ui that dont need to be persisted

** Optimization techniques**
# Redux: Only auth state (tokens, user profile).
# Zustand: Ephemeral state (geofence, live location).
# React Query: Server cache (messages, real-time data).
# Centralize WebSocket in a singleton hook and share data via Zustand

<!-- let socket: WebSocket | null = null;
export const useSocket = () => {
  useEffect(() => {
    if (!socket) socket = new WebSocket('wss://your-api.com');
    return () => { /* Cleanup on app exit */ };
  }, []);
}; -->

# reffrence *** https://chat.deepseek.com/a/chat/s/e4f99995-3fcb-42b0-a696-bd9481d1e42d ***