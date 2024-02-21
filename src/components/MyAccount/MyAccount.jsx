import './MyAccount.scss';
import { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useParams } from 'react-router-dom';

export default function MyAccount() {
  const [user, setUser] = useState('');
//   const { id } = useParams();

//   useEffect(() => {
//     const handleInfo = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/user/${id}`);
//         if (!response.ok) {
//           throw new Error('Error fetching user data');
//         }
//         const data = await response.json();
//         setUser(data);
//         const { token } = data;

//         // stocker le token dans localStorage
//         localStorage.setItem('jwtToken', token);
//       } catch (error) {
//         console.error('Cannot fetch data', error);
//       }
//     };
//     handleInfo();
//   }, [id]);

  // const handleInputValue = (e) => {
  //  const { name, value } = e.target;
  // setUser({ ...user, [name]: value });
  // }; */ }

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
              <input type="text" name="firstname" id="firstname" />
            </label>
            <label htmlFor="last name">
              Lastname
              <input type="text" name="lastname" id="lastname" />
            </label>
            <label htmlFor="phone">
              Phone number
              <input
                type="tel"
                name="phone"
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </label>
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
