import './Login.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../React-Context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  // Check for stored token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');

    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn, setUser]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log('API Response:', data);
      const { token, user } = data;

      if (data.success) {
        setLoginError(false);
        setIsLoggedIn(true);
        setUser(user);
        // stocker le token dans localStorage
        localStorage.setItem('jwtToken', token);
        // Redirect to my account page
        navigate('/myaccount', { replace: true });
      } else {
        console.error('Échec de la connexion');
        setLoginError(true);
      }
    } catch (error) {
      console.error('Cannot log in', error);
    }
  };

  return (
    <>
      <div className="form__container">
        <h1>Login</h1>
        {isLoggedIn && (
          <p>You are already logged in. Redirecting to My Account...</p>
        )}
        {loginError && (
          <p style={{ color: 'red' }}> Error: Incorrect email or password</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="email">
              Email address:
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="form__group">
            <label htmlFor="password">
              Password:{' '}
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <input type="submit" value="Login" className="login__btn" />
            <NavLink to="/resetpassword">Forgotten your password?</NavLink>
          </div>
        </form>
      </div>
      <div className="signup__box">
        <div className="sign__btn">
          <NavLink to="/signup">
            <input type="submit" value="Sign Up" />
          </NavLink>
        </div>
      </div>
    </>
  );
}
