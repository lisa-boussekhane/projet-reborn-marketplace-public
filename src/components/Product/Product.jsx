import './Product.scss';
import { useParams, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../React-Context/CartContext';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [rating, setRating] = useState(0);
  // const [averageRating, setAverageRating] = useState(0);
  const [shopId, setShopId] = useState('');

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
        const shopIdFromProduct = data.shop_id;
        setShopId(shopIdFromProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.sold) {
      console.log("Le produit est vendu. Impossible d'ajouter au panier.");
      return;
    }
    addToCart(product, id);
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

  useEffect(() => {
    fetch(`http://localhost:3000/shop/${shopId}/ratings`)
      .then((response) => response.json())
      .then((data) => {
        setRating(data.averageRating);
        console.log(data.averageRating);
      })
      .catch((error) => console.error('Error:', error));
  }, [shopId]);

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
              {product
                ? product.seller.username
                : 'Details not provided by the seller yet.'}
            </p>
            <div className="star__box">

              {rating !== null && rating !== undefined ? (
                <StarRatings
                  rating={parseFloat(rating)}
                  size={10}
                  starRatedColor="gold"
                  className="star__items"
                />
              ) : (
                <p>This seller has not received any ratings yet.</p>
              )}
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
        <p>
          Price ${product ? product.price : 'Loading...'} + Shipping fees $
          {product ? product.shipping_fees : 'Loading...'}
        </p>
        <NavLink to="/cart">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product && product.sold}
            className={product && product.sold ? 'sold-out' : 'cart-button'}
          >
            {product && product.sold ? 'Product sold' : 'Add to cart'}
          </button>
        </NavLink>
      </div>
    </div>
  );
}
