import './Login.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      setEmail(response.data);
    } catch (error) {
      console.error('Cannot log in', error);
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
