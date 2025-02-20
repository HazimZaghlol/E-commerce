import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registrationSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("tkn", state.token);
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("tkn", state.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("tkn");
    },
  },
});

export const { logout, registrationSuccess, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
