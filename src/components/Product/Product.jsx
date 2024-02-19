import './Product.scss';
import { useParams, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Icon as Icons } from '@iconify/react';
import { useCart } from '../React-Context/CartContext';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

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
  return (
    <div className="product__container">
      <div className="product__box">
        <img src="./homepage1.jpeg" alt="reborn" className="product__img" />
      </div>

      <div className="product__wrapper">
        <h2>{product ? product.title : 'Loading...'}</h2>
        <div className="product__info">
          <h3>Seller Username</h3>
          <div className="star__box">
            <FontAwesomeIcon icon={faStar} id="star__items" />
            <FontAwesomeIcon icon={faStar} id="star__items" />
            <FontAwesomeIcon icon={faStar} id="star__items" />
            <FontAwesomeIcon icon={faStar} id="star__items" />
            <FontAwesomeIcon icon={faStar} id="star__items" />
          </div>
          <Icons
            icon="la:comments"
            style={{ color: '#a3a3a3', fontSize: '3.5em' }}
          />
        </div>
        <div className="product__group">
          <div className="product__group__col">
            <p>Type: {product ? product.type : 'Loading...'}</p>
            <p>Kit-name : {product ? product.kit_name : 'Loading...'}</p>
            <p>Sculptor : {product ? product.sculptor : 'Loading...'}</p>
            <p>
              Gender: {product ? product.detail_product.gender : 'Loading...'}
            </p>
            <p>Age range: {product ? product.age_range : 'Loading...'}</p>
            <p>Eyes: {product ? product.detail_product.eyes : 'Loading...'}</p>
            <p>Hair: {product ? product.detail_product.hair : 'Loading...'}</p>
            <p>Size: {product ? product.size : 'Loading...'}</p>
            <p>Weight: {product ? product.weight : 'Loading...'}</p>
            <p>
              Belly plate:
              {product ? product.detail_product.belly_plate : 'Loading...'}
            </p>
          </div>

          <div className="product__group__row">
            {product ? product.detail_product.description : 'Loading...'}
          </div>

          <div className="product__group__col">
            <p>
              Created : {product ? product.detail_product.year : 'Loading...'}
            </p>
          </div>

          <div className="product__group__row">
            <p>
              Status: {product ? product.detail_product.status : 'Loading...'}
            </p>
            <p>
              Authenticity card:{' '}
              {product ? product.authenticity_card : 'Loading...'}{' '}
            </p>
          </div>

          <div className="product__group__col">
            <p>
              Location:{' '}
              {product ? product.detail_product.localization : 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      <div className="product__fees">
        <p>
          Price ${product ? product.price : 'Loading...'} + Shipping fees $
          {product ? product.shipping_fees : 'Loading...'}$
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
