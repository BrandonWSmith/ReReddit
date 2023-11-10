function Comment(props) {
  const { comment } = props;
  return (
    <div>
      <div>
        <p>{comment.author}</p>
      </div>
      <p>{comment.body}</p>
    </div>
  );
};

export default Comment;