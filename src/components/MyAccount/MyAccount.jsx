import './MyAccount.scss';
import { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useParams } from 'react-router-dom';
import { useAuth } from '../React-Context/AuthContext';

export default function MyAccount() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [isUserUpdated, setisUserUpdated] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const handleInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://localhost:3000/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }
        const data = await response.json();
        setUserInfo(data);
        setisUserUpdated(false);
      } catch (error) {
        console.log({ error });
      }
    };
    handleInfo();
  }, [id, user, isUserUpdated]);
  console.log({ userInfo });

  return (
    <div className="account__container">
      <div>
        <h1>My Account</h1>
      </div>
      <ul className="account__items">
        <li>
          <Link to="/myaccount#profile">Personal information</Link>
        </li>
        <li>
          <Link to="/myaccount#orders">Orders and returns</Link>
        </li>
        <li>
          <Link to="/mystore">My store</Link>
        </li>
        <li>Chat</li>
        <li>
          <Link to="/deleteaccount">Delete account</Link>
        </li>
      </ul>

      <div id="profile">
        <div className="profile__information">
          {/* Insérer lien sur icon edit */}
          <img src="./edit-icon.png" alt="" className="edit__icon" />

          <div className="profile__title">
            <h1>My profile</h1>
          </div>
          <div className="profile__subtitle">
            <h2>Information</h2>
          </div>
          <form className="profile__elem" method="get">
            <label htmlFor="username">
              Username
              <input
                type="text"
                name="username"
                id="username"
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
              />
            </label>
            <label htmlFor="firstname">
              Firstname
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={userInfo.first_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, first_name: e.target.value })
                }
              />
            </label>
            <label htmlFor="last name">
              Lastname
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={userInfo.last_name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, last_name: e.target.value })
                }
              />
            </label>
            <label htmlFor="phone">
              Phone number
              <input
                type="tel"
                name="phone"
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                value={userInfo.phone}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phone: e.target.value })
                }
              />
            </label>
            <input type="submit" value="Save" className="save__btn" />
          </form>
        </div>

        <div className="login__information">
          <img src="./edit-icon.png" alt="" className="edit__icon__login" />
          <div className="login__subtitle">
            {' '}
            <h2>Login and Password</h2>
          </div>

          <form className="profile__elem__second" method="post" action="">
            <label htmlFor="email">
              Email address <input type="email" name="email" id="email" />
            </label>
            <label htmlFor="password">
              Password
              <input type="password" name="password" id="password" />
            </label>
            <input
              type="submit"
              value="Save Password"
              className="savepass__btn"
            />
          </form>
        </div>
      </div>

      <div id="orders">
        <div>
          <h1>Orders and Returns</h1>
        </div>

        <div className="order__container">
          <ul className="order__list">
            <li>Order id:</li>
            <li>Date Paid:</li>
            <li>Total Paid:</li>
            <li>Order Status:</li>
          </ul>
        </div>

        <div className="order__photos">
          <p className="order__p">Photos will be added here</p>
        </div>
      </div>
    </div>
  );
}
