import './ResetPassword.scss';
import { NavLink } from 'react-router-dom';

export default function ResetPassword() {
  return (
    <div className="form__box">
      <div>
        <h1>Reset Password</h1>
      </div>
      <form className="form__reset" method="post" action="">
        <div className="form__elem">
          <label htmlFor="email">
            Enter your email address to reset your password:
            <input type="email" name="email" id="email" placeholder="Email" />
          </label>
        </div>
        <div className="reset__buttons">
          <input type="submit" value="Reset Password" className="reset__btn" />
          <NavLink to="/" className="cancel__btn">
            Cancel
          </NavLink>
        </div>
      </form>
    </div>
  );
}
