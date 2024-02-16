import './Header.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const renderLoginOrAccountLink = () => {
    if (isLoggedIn) {
      return (
        <NavLink to="/myaccount">
          <li className="navbar__item">My Account</li>
        </NavLink>
      );
    }
    return (
      <NavLink to="/login">
        <li className="navbar__item">Login</li>
      </NavLink>
    );
  };
  return (
    <nav className={`navbar ${showLinks ? 'show-nav' : 'hide-nav'}`}>
      <div className="navbar___logo">
        <NavLink to="/">
          <img
            src="./AdoptAReborn2.png"
            alt="logo du site"
            className="navbar-logo"
          />
        </NavLink>
      </div>
      <form>
        <input type="search" placeholder="Search..." className="search-input" />
      </form>
      <ul className="navbar__links">
        <NavLink to="/">
          <li className="navbar__item">Home</li>
        </NavLink>
        <NavLink to="/reborns">
          <li className="navbar__item">Reborns</li>
        </NavLink>
        <NavLink to="/howitworks">
          <li className="navbar__item">How it works ?</li>
        </NavLink>
        <NavLink to="/aboutus">
          <li className="navbar__item">About us</li>
        </NavLink>
        <NavLink to="/faq">
          <li className="navbar__item">FAQ</li>
        </NavLink>
        <NavLink to="/contactus">
          <li className="navbar__item">Contact us</li>
        </NavLink>
        <NavLink to="/signup">
          <li className="navbar__item">Sign up</li>
        </NavLink>
        <NavLink to="/login">{renderLoginOrAccountLink()}</NavLink>
        <NavLink to="/cart">
          <img src="./cart.png" alt="logo du site" className="navbar-cart" />
        </NavLink>
      </ul>
      <button
        type="button"
        className="navbar__burger"
        onClick={handleShowLinks}
      >
        {' '}
        <span className="burger-bar" />
      </button>
    </nav>
  );
}
