import './SignUp.scss';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import validator from 'validator';
import passwordValidator from 'password-validator';
import { Input, Button } from 'semantic-ui-react';
import { useAuth } from '../React-Context/AuthContext';

export default function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
      const response = await fetch(
        `${import.meta.env.REACT_APP_API_URL}/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            first_name: firstname,
            last_name: lastname,
            email,
            password,
            username,
          }),
        }
      );

      const data = await response.json();
      if (response.status === 400 && data.message) {
        // l'utilisateur existe déjà
        setRegistrationSuccess(false);
        setPasswordError(data.message);
      } else if (!response.ok) {
        // erreur
        throw new Error('Error during sign-up');
      } else {
        // inscrit sans soucis
        setRegistrationSuccess(true);
        navigate('/login');
        console.log(data);
      }
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
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

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
          <div className="form__items__password">
            <label htmlFor="password">
              Password:{' '}
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                min={8}
                required
                action={
                  <Button
                    icon={showPassword ? 'eye slash' : 'eye'}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                  />
                }
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </label>
            <p>Password requirements: </p>
            <p>At least 8 characters, one uppercase and 2 digits.</p>
          </div>
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
