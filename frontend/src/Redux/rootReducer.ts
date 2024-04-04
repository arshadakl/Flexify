// app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import freelancerReducer from './Slices/freelancerSlice';
// import clientReducer from './Slices/clientSlice';
import adminReducer from './Slices/adminSlice';

const rootReducer = combineReducers({
  freelancer: freelancerReducer,
//   client: clientReducer,
  admin: adminReducer,
});

export default rootReducer;