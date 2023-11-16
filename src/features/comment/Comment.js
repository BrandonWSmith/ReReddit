import './comment.css';
import Markdown from 'react-markdown';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime); 

function Comment(props) {
  const { comment } = props;

  const renderGif = () => {
    if (comment.body !== undefined) {
      if (comment.body.includes('[gif]')) {
        const htmlDecode = (input) => {
          const doc = new DOMParser().parseFromString(input, "text/html");
          return doc.documentElement.textContent;
        }

        try {
          const el = document.createElement('html');
          el.innerHTML = htmlDecode(comment.body_html);
          const source = el.querySelector('img').src;
          const commentText = comment.body.split('![')
          return `${commentText[0]}![gif](${source})`;
        }
        catch (error) {
          return comment.body;
        }
      }
      
      return comment.body;
    }
  };

  return (
    <div className='comment-container'>
      <div className='comment-metadata'>
        <span className='comment-author-username'>{comment.author}</span>
        <span className='comment-created'>
          {dayjs.unix(comment.created_utc).fromNow()}
        </span>
      </div>
      <Markdown children={renderGif(comment.body)} />
    </div>
  );
};

export default Comment;