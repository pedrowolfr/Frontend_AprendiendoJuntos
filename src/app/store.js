import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import userSlice from "../pages/userSlice";
import userDetailSlice from "../pages/userDetailSlice";
import { thunk } from "redux-thunk";

const reducers = combineReducers({
    user: userSlice,
    userDetails: userDetailSlice,
  });
  
  const persistConfig = {
    key: "root",
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, reducers);
  
  export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(thunk),
  });
  