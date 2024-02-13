import './Login.scss';
import { useNavigate, useLocation } from 'react-router';
import { useState, useContext } from 'react';
import { useAuth } from 'react-use-auth';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/login';
  const { auth, setAuth } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API = axios.create({
    baseURL: 'http://localhost:3000',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', {
        name,
        password,
      }).then((res) => {
        if (res?.data.name) {
          const role = res?.data.role;
          setAuth({ role: `${role}`, name: `${name}` });
          setName('');
          setPassword('');
          navigate(from, { replace: true });
        } else {
          console.log('incorrect submission');
          setError(res.message);
        }
      });
    } catch (err) {
      if (!err?.response) {
        setError('no server response');
      } else {
        setError('registration failed');
      }
    }
  };

  return (
    <>
      <div className="form__container">
        <h1>Login</h1>
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
              />
            </label>
          </div>
          <div className="form__group">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                required
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
};

export default Login;
