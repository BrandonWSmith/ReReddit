import { useState } from "react";
import './post.css';
import { TiMessage, TiArrowUpThick, TiArrowUpOutline, TiArrowDownThick, TiArrowDownOutline } from 'react-icons/ti';
import Comment from "../comment/Comment";




function Post(props) {
  const [voteValue, setVoteValue] = useState(0);
  const { post, onToggleComments } = props;

  const handleVote = (newValue) => {
    if (newValue === voteValue) {
      setVoteValue(0);
    }
    else if (newValue === 1) {
      setVoteValue(1);
    }
    else {
      setVoteValue(-1);
    }
  };

  const renderUpVote = () => {
    if (voteValue === 1) {
      return <TiArrowUpThick />;
    }
    return <TiArrowUpOutline />;
  };

  const renderDownVote = () => {
    if (voteValue === -1) {
      return <TiArrowDownThick />;
    }
    return <TiArrowDownOutline />;
  }

  const renderComments = () => {
    if (post.isLoadingComments) {
      return(
        <div>
          <h3>Loading...</h3>
        </div>
      );
    }
    
    if (post.commentsError) {
      return (
        <div>
          <h3>Error Loading Comments</h3>
        </div>
      );
    }

    if (post.showingComments) {
      return(
        <div className='comments'>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }

    return null;
  };

  return(
    <article key={post.id}>
      <div className='post-wrapper'>
        <div className='post-votes-container'>
          <button className='up-vote' onClick={() => handleVote(1)}>
            {renderUpVote()}
          </button>
          <p className='post-votes-value'>{post.ups}</p>
          <button className='down-vote' onClick={() => handleVote(-1)}>
            {renderDownVote()}
          </button>
        </div>

        <div className='post-container'>
          <h3 className='title'>{post.title}</h3>
          
          <div className='post-image-container'>
            <img src={post.url} alt='' />
          </div>

          <div className='post-details'>
            <p className='author-username'>{post.author}</p>
            <div className='post-comment-button'>
              <button
                onClick={() => onToggleComments(post.permalink)}
              >
                <TiMessage />
              </button>
            </div>
          </div>

          {renderComments()}
        </div>
      </div>
    </article>
  );
};

export default Post;