import './Login.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../React-Context/AuthContext';
import { Input, Button } from 'semantic-ui-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log('API Response:', data);
      const { token, user } = data;

      // stocker le token et l'id dans localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userId', user.id);

      if (data.success) {
        setLoginSuccess(true);
        setLoginError(false);
        setIsLoggedIn(true);
        navigate('/myaccount');
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
          <p style={{ color: 'red' }}> Error : Incorrect email or password</p>
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
          <div className="form__group__password">
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
          </div>
          <div>
            <input type="submit" value="Login" className="login__btn" />
            <NavLink to="/forgotpassword">Forgotten your password?</NavLink>
          </div>
        </form>
      </div>
      <div className="signup__box">
        <div className="sign__btn">
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      </div>
    </>
  );
}
