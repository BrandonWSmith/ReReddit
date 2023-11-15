import './comment.css';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime); 

function Comment(props) {
  const { comment } = props;
  return (
    <div>
      <div>
        <p className='comment-author-username'>{comment.author}</p>
        <p className='comment-created'>
          {dayjs.unix(comment.created_utc).fromNow()}
        </p>
      </div>
      <ReactMarkdown children={comment.body} />
    </div>
  );
};

export default Comment;