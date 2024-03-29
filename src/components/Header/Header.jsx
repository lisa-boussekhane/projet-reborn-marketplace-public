/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-comment-textnodes */
import './Header.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../React-Context/AuthContext';

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');

    if (storedToken) {
      setIsLoggedIn(true);

      fetch(`${import.meta.env.REACT_APP_API_URL}/check-admin-role`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const isAdmin = data.isAdmin;
          localStorage.setItem('isAdmin', isAdmin);
          console.log('isAdminTrue:', isAdmin);
        })
        .catch((error) => {
          console.error('Error checking admin role:', error);
        });
    }
  }, [setIsLoggedIn]);
  const isAdminTrue = localStorage.getItem('isAdmin') === 'true';

  const handleSearch = (event) => {
    event.preventDefault();
    const search = event.target.search.value;
    navigate(`/results?search=${search}`);
    event.target.search.value = '';
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');

    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  // Clear element in localStorage
  const logOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  const toggleLoginOrAccount = () => {
    if (isAdminTrue) {
      return (
        <>
          <NavLink to="/admindashboard">
            <li className="navbar__item_admin">Admin</li>
          </NavLink>
          <NavLink to="/myaccount">
            <li className="navbar__item">My Account</li>
          </NavLink>
        </>
      );
    }
    if (isLoggedIn) {
      return (
        <NavLink to="/myaccount">
          <li className="navbar__item">My Account</li>
        </NavLink>
      );
    }
    return (
      <>
        <NavLink to="/signup">
          <li className="navbar__item">Sign up</li>
        </NavLink>
        <NavLink to="/login">
          <li className="navbar__item">Login</li>
        </NavLink>
      </>
    );
  };

  return (
    <nav className={`navbar ${showLinks ? 'show-nav' : 'hide-nav'}`}>
      <div className="navbar__logo">
        <NavLink to="/">
          <img
            src="./AdoptAReborn2.png"
            alt="logo du site"
            className="navbar-logo"
          />
        </NavLink>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="search-input"
        />
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

        {toggleLoginOrAccount()}
        {localStorage.getItem('jwtToken') ? (
          <li className="logout__btn" onClick={logOut}>
            Logout
          </li>
        ) : null}
        <NavLink to="/cart">
          <img src="./cart.png" alt="logo du site" className="navbar-cart" />
        </NavLink>
      </ul>

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
