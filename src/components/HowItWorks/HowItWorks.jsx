import './HowItWorks.scss';
import { NavLink } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <div className="notice__box">
      <h1>How it works?</h1>
      <div className="notice__container">
        <div className="notice__sell">
          <h2>Why should I sell on Adopt a Reborn?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
            dignissimos recusandae in alias laborum pariatur quas. Officiis quos
            laboriosam repudiandae magni, rerum possimus quae soluta voluptates,
            eum nihil quibusdam suscipit. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
        <div className="notice__buy">
          <h2>Why should I buy on Adopt a Reborn?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            molestias reprehenderit repudiandae! Earum voluptas exercitationem
            accusamus error, libero ut, nam illum rec usandae consequuntur,
            cupiditate sapiente eligendi voluptatibus adipisci dignissiuuygimos
            ipsum!Fieri, inquam, Triari, nullo pacto potest, ut non dicas, quid
            non probes eius, a quo dissentias. quid enim me prohiberet Epicureum
            esse, si probarem, quae ille diceret? cum praesertim illa perdiscere
            ludus esset. Quam ob rem dissentientium inter se reprehensiones non
            sunt vituperandae, maledicta, contumeliae, tum iracundiae,
            contentiones concertationesque in disputando pertinaces indignae
            philosophia mihi videri solent.
          </p>
        </div>
      </div>

      <div className="notice__wrapper">
        <div className="notice__group">
          <h2>Step 1</h2>
          <p className="notice__item">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            ipsam doloremque perferendis sed veritatis debitis aperiam culpa
            sunt doloribus, impedit iste ipsa consequatur, a odit aliquid non
            accusantium libero vitae.Illud tamen te esse admonitum volo, primum
            ut qualis es talem te esse omnes existiment ut, quantum a rerum
            turpitudine abes, tantum te a verborum libertate seiungas.
          </p>
        </div>
        <div className="notice__group">
          <h2>Step 2</h2>
          <p className="notice__item">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            ipsam doloremque perferendis sed veritatis debitis aperiam culpa
            sunt doloribus, impedit iste ipsa consequatur, a odit aliquid non
            accusantium libero vitae.Illud tamen te esse admonitum volo, primum
            ut qualis es talem te esse omnes existiment ut, quantum a rerum
            turpitudine abes, tantum te a verborum libertate seiungas; deinde ut
            ea in alterum ne dicas, quae cum tibi falso responsa sint,
            erubescas.
          </p>
        </div>
        <div className="notice__group">
          <h2>Step 3</h2>
          <p className="notice__item">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            ipsam doloremque perferendis sed veritatis debitis aperiam culpa
            sunt doloribus, impedit iste ipsa consequatur, a odit aliquid non
            accusantium libero vitae.Illud tamen te esse admonitum volo, primum
            ut qualis es talem te esse omnes existiment ut, quantum a rerum
            turpitudine abes, tantum te a verborum libertate seiungas; deinde ut
            ea in alterum ne dicas.
          </p>
        </div>
      </div>
      <div className="notice__btn">
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
