import './Login.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../React-Context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { setIsLoggedIn } = useAuth();

  const navigate = useNavigate();

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

      // stocker le token dans localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userId', user.id);


      if (data.success) {
        console.log('User Data:', data.user);

        console.log('IsLoggedIn:', isLoggedIn);
        console.log('User:', user);
        console.log('Token:', token);
        setLoginError(false);
        setIsLoggedIn(true);
       
        navigate('/myaccount', { replace: true });

      } else {
        console.error('Échec de la connexion');
      }
    } catch (error) {
      console.error('Cannot log in', error);
      setLoginError(true);
    }
  };

  return (
    <>
      <div className="form__container">
        <h1>Login</h1>
        {loginSuccess && <p style={{ color: 'green' }}>Login successful !</p>}

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
                value={email}
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
                value={password}
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
