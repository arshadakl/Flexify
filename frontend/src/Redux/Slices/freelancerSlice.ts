// freelancerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Freelancer } from '../../interfaces/Freelancer';

interface FreelancerState {
  freelancer: Freelancer | null;
  loading: boolean;
  error: string | null;
}

const initialState: FreelancerState = {
  freelancer: null,
  loading: false,
  error: null,
};

const freelancerSlice = createSlice({
  name: 'freelancer',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<Freelancer>) {
      state.freelancer = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateFreelancer(state, action: PayloadAction<Freelancer>) {
      if (state.freelancer) {
        state.freelancer = { ...state.freelancer, ...action.payload };
      }
    },
    updateFreelancerProfile(state, action: PayloadAction<{ profile: any }>) {
      if (state.freelancer) {
        state.freelancer.profile = action.payload.profile;
      }
    },
    logout(state) {
      state.freelancer = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, updateFreelancer,updateFreelancerProfile, logout } = freelancerSlice.actions;
export default freelancerSlice.reducer;