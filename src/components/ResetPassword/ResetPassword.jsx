import './ResetPassword.scss';
import { useState } from 'react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken');
      console.log(token);
      const response = await fetch('http://localhost:3000/updatepassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      console.log('Password reset successfully');
    } catch (error) {
      console.error('Failed to reset password', error);
    }
  };

  return (
    <div className="form__content">
      <div>
        <h1>Change your password</h1>
      </div>
      <form
        className="form__change"
        method="post"
        action=""
        onSubmit={handleSubmit}
      >
        <h4>Please enter a new password</h4>
        <div className="form__change__elem">
          <label htmlFor="currentpassword">
            Current password:
            <input
              type="password"
              name="password"
              id="newpassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Current password"
              min={8}
              required
            />
          </label>
          <label htmlFor="newpassword">
            New password:
            <input
              type="password"
              name="password"
              id="newpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="New password"
              min={8}
              required
            />
          </label>
        </div>
        <div className="resetpass__button">
          <input
            type="submit"
            value="Change password"
            className="resetpass__btn"
          />
        </div>
      </form>
    </div>
  );
}
