// freelancerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  Admin} from '../../interfaces/Admin';

interface AdminState {
  admin: Admin | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admin: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<Admin>) {
      state.admin = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.admin = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = adminSlice.actions;
export default adminSlice.reducer;