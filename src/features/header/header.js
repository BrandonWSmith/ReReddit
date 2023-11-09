import styles from './header.css'
import { BiChevronRight } from "react-icons/bi";
import { FaRedditAlien } from "react-icons/fa";

function Header() {
  return (
    <div className='header'>
      <h1><FaRedditAlien className='reddit-logo'/> <span>Re</span>Reddit</h1>
      <div className='searchbar'>
        <input className='search-input' placeholder='Search' />
        <button type='submit'><BiChevronRight /></button>
      </div>
      <div className='divider'></div>
    </div>
  );
}

export default Header;