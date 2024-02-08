import './MyAccount.scss';
import { HashLink as Link } from 'react-router-hash-link';
import { NavLink } from 'react-router-dom';

export default function MyAccount() {
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
          <Link to="/myaccount#store">My store</Link>
        </li>
        <li>Chat</li>
      </ul>

      <div id="profile">
        <h1 className="profile__title">My Profile</h1>
        <div className="profile__information">
          <h2>Information</h2>
        </div>
        <form className="profile__elem">
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
            />
          </label>
          <input type="submit" value="Save" className="save__btn" />
        </form>

        <div className="login__information">
          <h2 className="login__title">Login and Password</h2>
        </div>
        <form className="profile__elem__second">
          <label htmlFor="email">
            Email address <input type="email" name="email" id="email" />
          </label>
          <label htmlFor="password">
            Password <input type="password" name="password" id="password" />
          </label>
          <input
            type="submit"
            value="Save Password"
            className="savepass__btn"
          />
        </form>
      </div>
      <div id="orders">
        <div>
          <h1>Orders and Returns</h1>
          <h2>Order id:</h2>
        </div>
        <div className="order__container">
          <p>Date Paid:</p>
          <p>Amount Paid:</p>
          <p>Order Status:</p>
        </div>
        <div className="order__photos">Photos will be added here</div>
      </div>
      <p>
        <NavLink to="/deleteaccount">Delete Account</NavLink>
      </p>
    </div>
  );
}
