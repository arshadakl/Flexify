// // app/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './rootReducer';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: [], // Add reducers you want to exclude from persistence
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const persistor = persistStore(store);

// export default store;


// app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web

const persistConfig = {
 key: 'root',
 storage,
 blacklist: [], // Add reducers you want to exclude from persistence
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
 reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
