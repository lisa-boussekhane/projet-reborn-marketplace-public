import './SignUp.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="form__wrapper">
      <div>
        <h1>SignUp</h1>
      </div>
      <form className="box">
        <div className="form__items">
          <label htmlFor="firstname">
            First name:
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={firstname}
              placeholder="First name"
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
        </div>
        <div className="form__items">
          <label htmlFor="lastname">
            Last name:
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={lastname}
              placeholder="Last name"
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
        </div>
        <div className="form__items">
          <label htmlFor="email address">
            Email address:
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form__items">
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              min={8}
              max={12}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <input type="submit" value="SignUp" className="signup__btn" />
        <NavLink to="/login">Already registered? Click here to login</NavLink>
      </form>
    </div>
  );
}
