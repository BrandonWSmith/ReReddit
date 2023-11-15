import './header.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiChevronRight } from "react-icons/bi";
import { FaRedditAlien } from "react-icons/fa";
import { setSearchTerm } from '../../api/redditSlice';

function Header() {
  const [searchTermLocal, setSearchTermLocal] = useState('');
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchTermLocal(searchTerm);
  },
  [searchTerm]);

  const handleChange = (e) => {
    setSearchTermLocal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(searchTermLocal));
  };

  return (
    <div className='header'>
      <h1><FaRedditAlien className='reddit-logo'/> <span>Re</span>Reddit</h1>
      <form className='searchbar' onSubmit={handleSubmit}>
        <input className='search-input' placeholder='Search' onChange={handleChange} />
        <button type='submit' onClick={handleSubmit}>
          <BiChevronRight />
        </button>
      </form>
      <div className='divider'></div>
    </div>
  );
}

export default Header;