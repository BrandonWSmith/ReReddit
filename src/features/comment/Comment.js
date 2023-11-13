import './comment.css';

function Comment(props) {
  const { comment } = props;
  return (
    <div>
      <div>
        <p className='author-username'>{comment.author}</p>
      </div>
      <p>{comment.body}</p>
    </div>
  );
};

export default Comment;