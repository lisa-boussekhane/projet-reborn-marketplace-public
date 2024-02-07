import './Footer.scss';

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
          <p>Contact us</p>
          <p>FAQ</p>
          <p>Terms of sale</p>
          <p>Privacy policy</p>
          <p>Cookies policy</p>
        </div>
      </div>
    </footer>
  );
}
