import './Product.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Icon as Icons } from '@iconify/react';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
  return (
    <div className="product__container">
      <div className="product__box">
        <img src="./homepage1.jpeg" alt="reborn" className="product__img" />
        <div className="product__details">
          <div className="product__desc">
            <p className="product__p">
            </p>
          </div>
        </div>
      </div>

      <div className="product__wrapper">
        <h2>{product ? product.title : 'Loading...'}</h2>
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
            <p>Type: {product ? product.type : 'Loading...'}</p>
            <p>Kit-name : {product ? product.kit_name : 'Loading...'}</p>
            <p>Sculptor : {product ? product.sculptor : 'Loading...'}</p>
            <p>
              Gender: {product ? product.detail_product.gender : 'Loading...'}
            </p>
            <p>Age range: {product ? product.age_range : 'Loading...'}</p>
            <p>Eye: {product ? product.detail_product.eyes : 'Loading...'}</p>
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
            <p>Weight: </p>
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
          Price {product ? product.price : 'Loading...'}$ + Shipping fees{' '}
          {product ? product.shipping_fees : 'Loading...'}$
        </p>
        <Icons
          icon="la:comments"
          style={{ color: '#a3a3a3', fontSize: '3.5em' }}
        />
      </div>
    </div>
  );
}
