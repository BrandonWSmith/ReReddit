import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navbarReducer from '../features/navbar/navbarSlice';

export default configureStore({
  reducer: combineReducers({
    navbar: navbarReducer
  })
});