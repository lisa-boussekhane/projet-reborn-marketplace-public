import './SignUp.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';
import passwordValidator from 'password-validator';

export default function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const passwordSchema = new passwordValidator();
    passwordSchema
      .is()
      .min(8) // Minimum length 8 characters
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits(2); // Must have at least 2 digits

    if (!validator.isEmail(email)) {
      // Validate the email using validator
      console.error('Invalid email address');
      return;
    }
    if (!passwordSchema.validate(password)) {
      // Password does not meet the requirements
      setPasswordError(
        'The password must be at least 8 characters long, contain at least one uppercase letter, and 2 digits.'
      );
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstname,
          last_name: lastname,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error during sign-up');
      }

      const data = await response.json();
      setRegistrationSuccess(true);
      console.log(data);
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
              required
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
            />
          </label>
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
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
