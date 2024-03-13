import './AboutUs.scss';
import { NavLink } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div>
      <div className="about-us">
        <div className="about-us-img">
          <img src="./page-about-us.jpeg" alt="about us" />
        </div>
        <div className="about-us_text">
          <h1>About us</h1>
          <p>
            Our journey began with a simple passion for these extraordinary,
            lifelike creations and a dream to bring them closer to people around
            the world.
          </p>

          <h3>Our Mission</h3>

          <p>
            At Adopt a Reborn, we believe in the power of art to evoke emotions
            and create connections. Our mission is to provide a platform where
            artists and collectors can come together to share their love for
            reborn dolls. We strive to offer a diverse range of high-quality
            reborns, each crafted with precision and care, to suit the tastes
            and preferences of our diverse clientele.
          </p>

          <h3>Commitment to Quality</h3>

          <p>
            Quality is at the forefront of everything we do. We carefully vet
            each artist and their creations to ensure they meet our high
            standards of craftsmanship, realism, and artistic expression. Our
            customer support team is dedicated to providing you with the best
            shopping experience, assisting you in finding the perfect reborn
            doll that meets your desires and needs.
          </p>
          <h3>Join Our Journey</h3>

          <p>
            Whether you are here to browse, buy, or just learn more about reborn
            dolls, we welcome you to Adopt a Reborn. Join us in celebrating the
            artistry, the community, and the joy that these incredible dolls
            bring into our lives. We are honored to share our passion with you.
          </p>
        </div>
      </div>

      <div className="about-us-buttons">
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
