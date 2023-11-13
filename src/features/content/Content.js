import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchComments, selectFilteredPosts, setSearchTerm } from '../../api/redditSlice';
import Post from "../post/Post";
import './content.css';

function Content() {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, searchTerm, selectedSubreddit } = reddit;
  const posts = useSelector(selectFilteredPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  },
  [selectedSubreddit]);

  const onToggleComments = (index) => {
    const getPostComments = (permalink) => {
      dispatch(fetchComments(index, permalink));
    };

    return getPostComments;
  };

  if (isLoading) {
    return (
      <div className='isLoading'>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className='error'>
        <h2>Failed to load posts</h2>
        <button
          onClick={() => dispatch(fetchPosts(selectedSubreddit))}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className='error'>
        <h2>No posts matching "{searchTerm}"</h2>
        <button
          onClick={() => dispatch(setSearchTerm(''))}
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          post={post}
          onToggleComments={onToggleComments(index)}
        />
      ))}
    </>
  );
};

export default Content;