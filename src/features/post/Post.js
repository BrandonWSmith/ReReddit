import Comment from "../comment/Comment";
import { TiMessage } from 'react-icons/ti';

function Post(props) {
  const { post, onToggleComments } = props;

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
        <div>
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
      <div className='post-container'>
        <h3>{post.title}</h3>
        
        <div className='post-image-container'>
          <img src={post.url}/>
        </div>

        <div className='post-details'>
          <p>{post.author}</p>
          <div className='post-comments'>
            <button
              onClick={() => onToggleComments(post.permalink)}
            >
              <TiMessage />
            </button>
          </div>
        </div>

        {renderComments()}
      </div>
    </article>
  );
};

export default Post;