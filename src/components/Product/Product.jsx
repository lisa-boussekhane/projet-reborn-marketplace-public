import './Product.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Icon as Icons } from '@iconify/react';

export default function Product() {
  return (
    <div className="product__container">
      <div className="product__box">
        <img src="./homepage1.jpeg" alt="reborn" className="product__img" />
        <div className="product__details">
          <div className="product__desc">
            <p className="product__p">
              Description: Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Inventore omnis modi tenetur expedita veritatis perferendis
              eius quo debitis quibusdam, voluptatem minus ipsa repellendus illo
              nulla voluptate ex dignissimos hic saepe?
            </p>
          </div>
        </div>
      </div>

      <div className="product__wrapper">
        <h2>Name of the kit - Sculptor name - Type</h2>
        <div className="product__info">
          <h3>Seller Username</h3>
          <div className="lala">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
        <div className="product__group">
          <div className="product__group__col">
            <p>Created in: YYYY</p>
            <p>Belly plate:</p>
          </div>

          <div className="product__group__row">
            <p>Size:</p>
            <p>Weight:</p>
          </div>

          <div className="product__group__col">
            <p>Gender:</p>
          </div>

          <div className="product__group__row">
            <p>Status:</p>
            <p>Authenticity card:</p>
          </div>

          <div className="product__group__col">
            <p>Location:</p>
          </div>
        </div>
      </div>

      <div className="product__fees">
        <p>Price + Shipping fees</p>
        <Icons
          icon="la:comments"
          style={{ color: '#a3a3a3', fontSize: '3.5em' }}
        />
      </div>
    </div>
  );
}
