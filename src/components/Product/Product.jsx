import './Product.scss';
import { useParams, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { Icon as Icons } from '@iconify/react';
import { useCart } from '../React-Context/CartContext';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const stars = document.querySelectorAll('#star__items');

  stars.forEach((star, index1) => {
    star.addEventListener('click', () => {
      console.log(index1);

      stars.forEach((star, index2) => {
        index1 >= index2
          ? star.classList.add('active')
          : star.classList.remove('active');
      });
    });
  });

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/product/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.Media.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.Media.length) % product.Media.length
    );
  };
  return (
    <div className="product__container">
      <div className="product__img">
        {product && product.Media && product.Media.length > 0 && (
          <div className="image-container">
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="arrow-icon left"
              onClick={handlePrevImage}
              size="2x"
            />
            <img
              src={`http://localhost:5173/${product.Media[currentImageIndex].photo}`}
              alt={`Product ${product.id} ${currentImageIndex + 1}`}
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              className="arrow-icon right"
              onClick={handleNextImage}
              size="2x"
            />
          </div>
        )}
      </div>

      <div className="product__infos">
        <div className="product__infos_row">
          <h2>{product ? product.title : 'Loading...'}</h2>
          <div className="product__rating">
            <p>
              {product && product.Users && product.Users[0]
                ? product.Users[0].first_name
                : 'Details not provided by the seller yet.'}
            </p>
            <div className="star__box">
              <FontAwesomeIcon icon={faStar} id="star__items" />
              <FontAwesomeIcon icon={faStar} id="star__items" />
              <FontAwesomeIcon icon={faStar} id="star__items" />
              <FontAwesomeIcon icon={faStar} id="star__items" />
              <FontAwesomeIcon icon={faStar} id="star__items" />
            </div>
          </div>
        </div>

        <div className="product__group__column1">
          <p>Type: {product ? product.type : 'Loading...'}</p>
          <p>Kit-name : {product ? product.kit_name : 'Loading...'}</p>
          <p>Sculptor : {product ? product.sculptor : 'Loading...'}</p>
          <p>
            Gender:{' '}
            {product && product.Detail_product
              ? product.Detail_product.gender
              : 'Details not provided by the seller yet.'}
          </p>
          <p>Age range: {product ? product.age_range : 'Loading...'}</p>
          <p>
            Eyes:{' '}
            {product && product.Detail_product
              ? product.Detail_product.eyes
              : 'Details not provided by the seller yet.'}
          </p>
          <p>
            Hair:{' '}
            {product && product.Detail_product
              ? product.Detail_product.hair
              : 'Details not provided by the seller yet.'}
          </p>
          <p>Size: {product ? product.size : 'Loading...'}</p>
          <p>Weight: {product ? product.weight : 'Loading...'}</p>
          <p>
            Belly plate:{' '}
            {product && product.Detail_product
              ? product.Detail_product.belly_plate
              : 'Details not provided by the seller yet.'}
          </p>
          <p>Unique ID: {product ? product.unique_id : 'Loading...'}</p>

          <p>
            <p>
              {product && product.Detail_product
                ? product.Detail_product.description
                : 'Details not provided by the seller yet.'}
            </p>
          </p>
        </div>
        <div className="product__group__column__row">
          <p>
            Created :{' '}
            {product && product.Detail_product
              ? product.Detail_product.year
              : 'Details not provided by the seller yet.'}
          </p>
          <p>
            Status:{' '}
            {product && product.Detail_product
              ? product.Detail_product.status
              : 'Details not provided by the seller yet.'}
          </p>
          <p>
            Authenticity card:{' '}
            {product ? product.authenticity_card : 'Loading...'}{' '}
          </p>
          <p>
            Location:{' '}
            {product && product.Detail_product
              ? product.Detail_product.localization
              : 'Details not provided by the seller yet.'}
          </p>
        </div>
      </div>

      <div className="product__fees">
        <Icons
          icon="la:comments"
          style={{ color: '#a3a3a3', fontSize: '3.5em' }}
        />
        <p>
          Price ${product ? product.price : 'Loading...'} + Shipping fees $
          {product ? product.shipping_fees : 'Loading...'}
        </p>
        <NavLink to="/cart">
          <button id="cart-button" type="button" onClick={handleAddToCart}>
            Add to cart
          </button>
        </NavLink>
      </div>
    </div>
  );
}
