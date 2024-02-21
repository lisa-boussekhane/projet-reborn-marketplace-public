import { HashLink as Link } from 'react-router-hash-link';
import { useEffect, useState } from 'react';
import { useAuth } from '../React-Context/AuthContext';

export default function MyAccount() {
  const { user } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(null);
  const [getOrder, setOrder] = useState(null);

  // fetch user info
  useEffect(() => {
    const handleInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://localhost:3000/user/${user.id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userData = await response.json();
          setUserInfo(userData);
        } else {
          console.error('Cannot fetch user data');
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    handleInfo();
  }, [user]);

  // update user info
  useEffect(() => {
    const handleUpdateInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://localhost:3000/user/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateInfo),
        });

        if (response.status === 200) {
          const userUpdateData = await response.json();
          setUserInfo(userUpdateData);
        } else {
          console.error('Cannot edit user data');
        }
      } catch (error) {
        console.error('Failed to edit data', error);
      }
    };

    handleUpdateInfo();
  }, [user, updateInfo]);

  const handleInputValue = (e) => {
    const { name, value } = e.target;
    setUpdateInfo({ ...user, [name]: value });
  };

  // get order info
  useEffect(() => {
    const handleOrder = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch('http://localhost:3000/myorders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userOrderData = await response.json();
          setOrder(userOrderData);
        } else {
          console.error('Cannot fetch order');
        }
      } catch (error) {
        console.error('Failed to fetch order', error);
      }
    };

    handleOrder();
  }, []);

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
            <label htmlFor="firstname">
              Firstname
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={user.first_name}
                onChange={handleInputValue}
              />
            </label>
            <label htmlFor="last name">
              Lastname
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={user.last_name}
                onChange={handleInputValue}
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
                value={user.phone}
                onChange={handleInputValue}
              />
            </label>
          </form>
          <form className="profile__elem" method="get">
            <label htmlFor="firstname">
              First name <input type="text" name="firstname" id="firstname" />
            </label>
            <label htmlFor="last name">
              Last name <input type="text" name="lastname" id="lastname" />
            </label>
            <label htmlFor="phone">
              Phone number
              <input
                type="tel"
                name="phone"
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
                value={user.phone}
                onChange={handleInputValue}
              />
            </label>

            <input type="submit" value="Save" className="save__btn" />
          </form>
        </div>
        <div className="login__information">
          <img src="./edit-icon.png" alt="" className="edit__icon__login" />
          <div className="login__subtitle">
            <h2>Login and Password</h2>
          </div>

          <form className="profile__elem__second" method="post" action="">
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputValue}
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInputValue}
              />
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
          {getOrder.map((order) => (
            <ul key={order.id} className="order__list">
              <li>{order.id} </li>
              <li>{order.created_at} </li>
              <li>{order.price} </li>
              <li>{order.status} </li>
            </ul>
          ))}
        </div>

        <div className="order__photos">
          <p className="order__p">Photos will be added here</p>
        </div>
      </div>
    </div>
  );
}
