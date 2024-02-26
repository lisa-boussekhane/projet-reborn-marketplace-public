import './HowItWorks.scss';
import { NavLink } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <div className="notice__box container">
      <h1>How it works?</h1>
      <div className="notice__container container">
        <div className="notice__sell">
          <h2>Why should I sell on Adopt a Reborn?</h2>
          <p>
            Selling on Adopt a Reborn offers benefits such as reaching a
            targeted audience interested in these lifelike dolls, benefiting
            from a supportive community, safer transaction processes, valuable
            feedback and reviews from knowledgeable buyers, and user-friendly
            platform navigation.
          </p>
        </div>
        <div className="notice__buy">
          <h2>Why should I buy on Adopt a Reborn?</h2>
          <p>
            Purchasing from Adopt a Reborn offers several benefits for reborn
            doll enthusiasts, including access to a high-quality selection of
            handcrafted dolls, connection with a niche community of collectors
            and experts, guaranteed authenticity and quality, secure
            transactions, expertise from knowledgeable sellers, availability of
            exclusive and rare finds, personalized customer service, and
            valuable educational resources on collecting and caring for reborn
            dolls. Buyers are advised to review seller reputations and platform
            policies to ensure a satisfying purchase experience.
          </p>
        </div>
      </div>

      <div className="notice__wrapper container">
        <div className="notice__group ">
          <h2>Step 1 - Browse and Select</h2>
          <p className="notice__item">
            Start by exploring the selection of reborn dolls available on the
            platform. Use filters and search functions to narrow down your
            options based on your preferences, such as doll size, gender, hair
            type, or artist. Once you find a doll that captures your interest,
            review the listing details carefully. This includes the doll's
            specifications, artist information, and price.
          </p>
        </div>
        <div className="notice__group">
          <h2>Step 2 - Contact Seller</h2>
          <p className="notice__item">
            If you have questions about the doll, contact the seller directly
            through the platform's messaging system. This step is crucial for
            clarifying any doubts and ensuring the doll meets your expectations.
            It's also an opportunity to inquire about the shipping costs,
            delivery times, and return policies.
          </p>
        </div>
        <div className="notice__group">
          <h2>Step 3 - Make a Purchase</h2>
          <p className="notice__item notice__item--margin">
            Once you're satisfied with your choice, proceed to purchase the
            doll. This will typically involve adding the doll to your cart,
            choosing a payment method, and providing shipping information. Adopt
            a Reborn platforms usually offer secure payment options to protect
            your transaction. After completing your purchase, you'll receive a
            confirmation email with the details of your order and expected
            delivery date.
          </p>
        </div>
      </div>
      <div className="notice__btn container">
        <NavLink to="/signup">
          <input
            type="submit"
            value="Get started now!"
            className="notice__btn__item"
          />
        </NavLink>
      </div>
    </div>
  );
}
