import './ResetPassword.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null); // New state for error handling
  const { token } = useParams();
  const [success, setSuccess] = useState(false); // New state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Token:', token);
    // Validate password matching
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/resetpassword/${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newPassword: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
      setSuccess(true); 
      console.log('Password reset successfully');
    } catch (error) {
      console.error('Failed to reset password', error);
      setError('Failed to reset password. Please try again.'); 
    }
  };

  return (
    <div className="form__content">
      <div>
        <h1>Change your password</h1>
        {success && <div className="success-message">Password reset successfully!</div>}
      </div>
      <form
        className="form__change"
        method="post"
        action=""
        onSubmit={handleSubmit}
      >
        <h4>Please enter a new password</h4>
        <div className="form__change__elem">
          <label htmlFor="newpassword">
            New password:
            <input
              type="password"
              name="password"
              id="newpassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              minLength={8} // Correct attribute name
              required
            />
          </label>
          <label htmlFor="confirmpassword">
            Confirm password:
            <input
              type="password"
              name="password"
              id="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              minLength={8} // Correct attribute name
              required
            />
          </label>
        </div>
        {error && <div className="error-message">{error}</div>}{' '}
        {/* Display error message */}
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
