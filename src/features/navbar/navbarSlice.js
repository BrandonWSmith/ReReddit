import { createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../../api/reddit";

const initialState = {
  subreddits: [],
  error: false,
  isLoading: false
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    getSubredditsPending(state) {
      state.error = false;
      state.isLoading = true;
    },
    getSubredditsRejected(state) {
      state.error = true;
      state.isLoading = false;
    },
    getSubredditsFulfilled(state, action) {
      state.isLoading = false;
      state.subreddits = action.payload;
    }
  }
});

export const fetchSubreddits = () => async(dispatch) => {
  try {
    dispatch(getSubredditsPending());
    const subreddits = await getSubreddits();
    dispatch(getSubredditsFulfilled(subreddits));
  }
  catch (error) {
    dispatch(getSubredditsRejected());
  }
};

export const selectSubreddits = (state) => state.navbar.subreddits;

export const { getSubredditsPending, getSubredditsRejected, getSubredditsFulfilled } = navbarSlice.actions;
export default navbarSlice.reducer;