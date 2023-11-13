import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getSubredditPosts, getPostComments } from "./reddit";

const initialState = {
  posts: [],
  error: false,
  isLoading: false,
  searchTerm: '',
  selectedSubreddit: '/r/pics'
};

const redditSlice = createSlice({
  name: 'reddit',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    getPostsPending(state) {
      state.error = false;
      state.isLoading = true;
    },
    getPostsRejected(state) {
      state.error = true;
      state.isLoading = false;
    },
    getPostsFulfilled(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit(state, action) {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
    },
    toggleShowingComments(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
    },
    getCommentsPending(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
      if (!state.posts[action.payload].showingComments) {
        return;
      }
      state.posts[action.payload].commentsError = false;
      state.posts[action.payload].isLoadingComments = true;
    },
    getCommentsRejected(state, action) {
      state.posts[action.payload].commentsError = true;
      state.posts[action.payload].isLoadingComments = false;
    },
    getCommentsFulfilled(state, action) {
      state.posts[action.payload.index].isLoadingComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    }
  }
});

export const fetchPosts = (subreddit) => async (dispatch) => {
  try {
    dispatch(getPostsPending());
    const posts = await getSubredditPosts(subreddit);
    const postsWithComments = posts.map((post) => ({
      ...post,
      comments: [],
      showingComments: false,
      commentsError: false,
      isLoadingComments: false
    }));
    dispatch(getPostsFulfilled(postsWithComments));
  }
  catch (error) {
    dispatch(getPostsRejected());
  }
};

export const fetchComments = (index, permalink) => async (dispatch) => {
  try {
    dispatch(getCommentsPending(index));
    const comments = await getPostComments(permalink);
    dispatch(getCommentsFulfilled({ index, comments }));
  }
  catch (commentsError) {
    dispatch(getCommentsRejected(index));
  }
};

export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;

const selectPosts = (state) => state.reddit.posts;
const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectFilteredPosts = createSelector(
  [selectPosts, selectSearchTerm],
  (posts, searchTerm) => {
    if (searchTerm !== '') {
      return posts.filter((post) => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return posts;
  }
);

export const {
  setPosts,
  getPostsPending,
  getPostsRejected,
  getPostsFulfilled,
  setSearchTerm,
  setSelectedSubreddit,
  toggleShowingComments,
  getCommentsPending,
  getCommentsRejected,
  getCommentsFulfilled
} = redditSlice.actions;
export default redditSlice.reducer;