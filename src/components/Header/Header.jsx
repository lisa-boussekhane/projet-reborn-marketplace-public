import './Header.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useAuth } from '../React-Context/AuthContext';

export default function Header() {
  // on récupère le token dans le localStorage
  const user = localStorage.getItem('jwtToken');
  const navigate = useNavigate();
  console.log(user);

  // on efface l'élément dans le localStorage
  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  };

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
      {localStorage.getItem('jwtToken') ? (
        <div className="logout__btn">
          <Nav>
            <NavDropdown title="Logout">
              <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      ) : null}

      <button
        type="button"
        className="navbar__burger"
        onClick={handleShowLinks}
      >
        <span className="burger-bar" />
      </button>
    </nav>
  );
}
