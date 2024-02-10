import './Homepage.scss';
import { NavLink } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage-img">
        <img src="./homepage1.jpeg" alt="reborn 1" />
        <img src="./homepage2.jpg" alt="reborn 2" />
        <img src="./homepage3.jpeg" alt="reborn 3" />
      </div>
      <div className="homepage-text">
        <p>
          Welcome to Adopt a Reborn, your premier destination for exploring the
          fascinating world of reborns - hyper-realistic dolls crafted with
          unmatched attention to detail. Whether you're a passionate collector,
          an artist seeking inspiration, or simply an enthusiast of these unique
          creations, you'll find a wide selection of reborns here, each with its
          own story to tell. Immerse yourself in a world where art and emotion
          intersect, and be captivated by the beauty and authenticity of our
          dolls. Explore, dream, and find the reborn that speaks to your heart.
          Welcome to our community devoted to the love of reborns !
        </p>
      </div>
      <div className="homepage-buttons">
        <NavLink to="/signup">
          <button type="button" id="btn-account">
            Create an account
          </button>
        </NavLink>
        <NavLink to="/reborns">
          <button type="button" id="btn-adopt">
            Adopt a reborn
          </button>
        </NavLink>
        <NavLink to="/contactus">
          <button type="button" id="btn-contact">
            Contact us
          </button>
        </NavLink>
      </div>
      <div className="homepage-button_images">
        <img src="./icon-create-account.jpg" alt="adopt a reborn" />
        <img src="./icon-aar.jpg" alt="adopt a reborn" />
        <img src="./icon-contact-us.jpg" alt="contact us" />
      </div>
    </div>
  );
}
