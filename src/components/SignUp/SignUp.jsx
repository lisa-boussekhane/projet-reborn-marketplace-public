import './SignUp.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        first_name: firstname,
        last_name: lastname,
        email,
        password,
      });
      setRegistrationSuccess(true);
      console.log(response.data);
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };
  return (
    <div className="form__wrapper">
      <h1>Sign Up</h1>
      {registrationSuccess && (
        <p className="success-message">Utilisateur enregistré avec succès !</p>
      )}
      <form onSubmit={handleSignUp}>
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
        <div>
          <input type="submit" value="Sign Up" className="signup__btn" />
          <NavLink to="/login" className="signup__link">
            Already registered? Click here to login
          </NavLink>
        </div>
      </form>
    </div>
  );
}
