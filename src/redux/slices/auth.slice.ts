import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: {
    _id: string;
    uid: string;
    name: string;
    email: string;
    profilePic: string;
    gender: string;
    country: string;
    createdAt: string;
    __v: number;
  } | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "authPersist",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const getToken = (state: { authPersist: AuthState }): string | null =>
  state.authPersist.token;
export const getUser = (state: { authPersist: AuthState }): AuthState["user"] =>
  state.authPersist.user;
