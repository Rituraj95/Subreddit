import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query';
import { redditApi } from './slices/redditApiSlice';
import subredditReducer from './slices/subredditSlice';

// Redux Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['subreddit'], // Persist the subreddit lanes
};

const rootReducer = combineReducers({
  subreddit: subredditReducer,
  [redditApi.reducerPath]: redditApi.reducer, // RTK Query reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable this check due to redux-persist
    }).concat(redditApi.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
