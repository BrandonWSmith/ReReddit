import './navbar.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubreddits, selectSubreddits } from "./navbarSlice";

function Navbar() {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubreddits);

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
            <button>
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