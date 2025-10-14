import { Link } from "react-router";

const Header = () => {
  return (
    <div className='top-nav'>
      <Link to={"/"}>
        <h1>Coin Scope</h1>
      </Link>
      <div className='nav-links'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
      </div>
    </div>
  );
};

export default Header;
