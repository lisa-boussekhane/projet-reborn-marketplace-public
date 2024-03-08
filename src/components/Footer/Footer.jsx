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
            <a
              href="https://www.facebook.com/adoptreborn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./fb.png"
                alt="logo fb"
                className="network-logo"
                style={{ width: '850px' }}
              />
            </a>
            <a
              href="https://www.instagram.com/adoptreborn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./insta.png"
                alt="logo insta"
                className="network-logo"
                style={{ width: '850px' }}
              />
            </a>
            <a
              href="https://twitter.com/AAReborns"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="./twitter.png"
                alt="logo twi"
                className="network-logo"
                style={{ width: '850px' }}
              />
            </a>
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
