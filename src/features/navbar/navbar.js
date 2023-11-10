import './navbar.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits, selectSubreddits } from "./navbarSlice";
import { selectSelectedSubreddit, setSelectedSubreddit } from '../../api/redditSlice';

function Navbar() {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);
  const selectedSubreddit = useSelector(selectSelectedSubreddit);

  useEffect(() => {
    dispatch(fetchSubreddits());
  },
  [dispatch]);

  return (
    <div className='subreddits'>
      <h2>Subreddits</h2>
      <ul className='subreddits-list'>
        {subreddits.map((subreddit) => (
          <li
            key={subreddit.id}
          >
            <button
              onCLick={() => dispatch(setSelectedSubreddit(subreddit.url))}
            >
              <img
                src={subreddit.icon_img || 'favicon.ico'}
                className='subreddit-icon'
                alt={`${subreddit.display_name}`}
                style={{border: `2px solid ${subreddit.primary_color}`}}
              />
              {subreddit.display_name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Navbar;