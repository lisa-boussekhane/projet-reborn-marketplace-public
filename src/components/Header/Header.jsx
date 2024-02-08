import './Header.scss';

export default function Header() {
  return (
    <header className="header">
      <img src="./logo.png" alt="logo du site" className="header-logo" />
      <div className="header-content">
        <form>
          <input
            type="search"
            placeholder="Search..."
            className="search-input"
          />
        </form>
        <p>Home</p>
        <p>Reborns</p>
        <p>How it works ?</p>
        <p>About us</p>
        <p>FAQ</p>
        <p>Contact us</p>
        <p id="sign-up">Sign up/Login</p>
        <img src="./cart.png" alt="logo du site" className="header-cart" />
      </div>
    </header>
  );
}
