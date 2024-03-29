import './ResetRequest.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function ResetRequest() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_API_URL}/resetrequest`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        }
      );
      console.log(email);

      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }
      const data = await response.json();
      setEmail(data);
      console.log('Reset link sent successfully');
    } catch (error) {
      console.error('Failed to send reset link', error);
    }
  };

  return (
    <div className="form__box">
      <div>
        <h1>Reset Password</h1>
      </div>
      <form
        className="form__reset"
        method="post"
        action=""
        onSubmit={handleSubmit}
      >
        <div className="form__elem">
          <label htmlFor="email">
            Enter your email address to reset your password:
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="reset__buttons">
          <input type="submit" value="Send Reset Link" className="reset__btn" />
          <NavLink to="/login" className="cancel__btn">
            Cancel
          </NavLink>
        </div>
      </form>
    </div>
  );
}
