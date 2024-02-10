import './Footer.scss';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <p>Adopt a Reborn 2024</p>
        </div>
        <div className="footer-center">
          <div className="footer-join-us">
            <p>Join us</p>
          </div>
          <div className="network-logos">
            <img src="./fb.png" alt="logo fb" className="network-logo" />
            <img src="./insta.png" alt="logo insta" className="network-logo" />
            <img src="./twitter.png" alt="logo twi" className="network-logo" />
          </div>
        </div>
        <div className="footer-right">
          <NavLink to="/contactus">
            <p>Contact us</p>
          </NavLink>
          <NavLink to="/faq">
            <p>FAQ</p>
          </NavLink>
          <NavLink to="/termsofsale">
            <p>Terms of sale</p>
          </NavLink>
          <NavLink to="/privacypolicy">
            <p>Privacy policy</p>
          </NavLink>
          <NavLink to="/cookiespolicy">
            <p>Cookies policy</p>
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
