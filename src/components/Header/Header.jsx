import './Header.scss';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <NavLink to="/">
        <img src="./logo.png" alt="logo du site" className="header-logo" />
      </NavLink>
      <div className="header-content">
        <form>
          <input
            type="search"
            placeholder="Search..."
            className="search-input"
          />
        </form>
        <NavLink to="/">
          <p>Home</p>
        </NavLink>
        <NavLink to="/reborns">
          <p>Reborns</p>
        </NavLink>
        <NavLink to="/howitworks">
          <p>How it works ?</p>
        </NavLink>
        <NavLink to="/aboutus">
          <p>About us</p>
        </NavLink>
        <NavLink to="/faq">
          <p>FAQ</p>
        </NavLink>
        <NavLink to="/contactus">
          <p>Contact us</p>
        </NavLink>
        <NavLink to="/signup">
          <p className="sign-up">Sign up</p>
        </NavLink>
        <NavLink to="/login">
          <p className="sign-up">Login</p>
        </NavLink>
        <NavLink to="/cart">
          <img src="./cart.png" alt="logo du site" className="header-cart" />
        </NavLink>
      </div>
    </header>
  );
}
