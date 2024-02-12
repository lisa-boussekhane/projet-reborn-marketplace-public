import './ContactUs.scss';
import { NavLink } from 'react-router-dom';

export default function ContactUs() {
  return (
    <div>
      <div className="contact-us">
        <div className="contact-us-img">
          <img src="./page-contact-us.jpg" alt="contact us" />
        </div>
        <div className="contact-us_form">
          <h1>Contact us</h1>

          <form>
            <div className="form-row">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
            </div>
            <textarea placeholder="Message" required />

            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <div className="contact-us-buttons">
        <NavLink to="/signup">
          <button type="button" id="btn-account">
            Create an account
          </button>
          <img src="./icon-create-account.jpg" alt="create account" />
        </NavLink>
        <NavLink to="/reborns">
          <button type="button" id="btn-adopt">
            Adopt a reborn
          </button>
          <img src="./icon-aar.jpg" alt="adopt a reborn" />
        </NavLink>
        <NavLink to="/contactus">
          <button type="button" id="btn-contact">
            Contact us
          </button>
          <img src="./icon-contact-us.jpg" alt="contact us" />
        </NavLink>
      </div>
    </div>
  );
}
