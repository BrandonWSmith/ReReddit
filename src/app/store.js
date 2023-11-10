import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navbarReducer from '../features/navbar/navbarSlice';
import redditReducer from '../api/redditSlice';

export default configureStore({
  reducer: combineReducers({
    navbar: navbarReducer,
    reddit: redditReducer
  })
});