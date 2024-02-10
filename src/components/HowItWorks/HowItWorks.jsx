import './HowItWorks.scss';
import { NavLink } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <>
      <h1>How it works?</h1>
      <div className="notice__container">
        <div className="notice__sell">
          <h2>Why should I sell on Adopt a Reborn?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            dignissimos recusandae in alias laborum pariatur quas. Officiis quos
            laboriosam repudiandae magni, rerum possimus quae soluta voluptates,
            eum nihil quibusdam suscipit.
          </p>
        </div>
        <div className="notice__buy">
          <h2>Why should I buy on Adopt a Reborn?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            molestias reprehenderit repudiandae! Earum voluptas exercitationem
            accusamus error, libero ut, nam illum recusandae consequuntur,
            cupiditate sapiente eligendi voluptatibus adipisci dignissiuuygimos
            ipsum!
          </p>
        </div>
      </div>

      <div className="notice__wrapper">
        <h2>Step 1</h2>
        <div className="notice__group">
          <p className="notice__item1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            ipsam doloremque perferendis sed veritatis debitis aperiam culpa
            sunt doloribus, impedit iste ipsa consequatur, a odit aliquid non
            accusantium libero vitae.
          </p>
        </div>
        <h2>Step 2</h2>
        <div className="notice__group">
          <p className="notice__item2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            ipsam doloremque perferendis sed veritatis debitis aperiam culpa
            sunt doloribus, impedit iste ipsa consequatur, a odit aliquid non
            accusantium libero vitae.
          </p>
        </div>
        <h2>Step 3</h2>
        <div className="notice__group">
          <p className="notice__item3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            ipsam doloremque perferendis sed veritatis debitis aperiam culpa
            sunt doloribus, impedit iste ipsa consequatur, a odit aliquid non
            accusantium libero vitae.
          </p>
        </div>
      </div>
      <NavLink to="/mystore">
        <input type="submit" value="Get started now!" className="notice__btn" />
      </NavLink>
    </>
  );
}
