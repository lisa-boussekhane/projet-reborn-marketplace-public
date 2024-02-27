import './AdminProducts.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminProducts() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showImages, setShowImages] = useState(false);
  useEffect(() => {
    if (userRole !== 'Admin') {
      setErrorMessage('You do not have the permissions to access this page.');

      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/products');

        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }

        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [navigate, userRole]);

  const handleShowImages = () => {
    setShowImages(!showImages);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch('http://localhost:3000/admin/product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete product.');
      }

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="admin-page">
        {errorMessage && <p>{errorMessage}</p>}
        {userRole === 'Admin' && (
          <>
            <div className="admin-header">Admin dashboard</div>
            <div className="admin-nav">
              <NavLink to="/adminusers" activeClassName="active-link">
                All Users
              </NavLink>
              <NavLink to="/adminshops" activeClassName="active-link">
                All Shops
              </NavLink>
              <NavLink to="/adminproducts" activeClassName="active-link">
                All Products
              </NavLink>
            </div>
          </>
        )}
      </div>
      <div className="product-card">
        {errorMessage && <p>{errorMessage}</p>}
        {userRole === 'Admin' && (
          <>
            {products.map((product) => (
              <div key={product.id} className="product-info">
                <p>
                  <strong>Product id:</strong> {product.id}
                </p>
                <p>
                  <strong>Product unique id :</strong> {product.unique_id}
                </p>
                <p>
                  <strong>Product title :</strong> {product.title}
                </p>
                <p>
                  <strong>Product kit_name :</strong> {product.kit_name}
                </p>
                <p>
                  <strong>Product sculptor :</strong> {product.sculptor}
                </p>
                <p>
                  <strong>Product size :</strong>
                  {product.size}
                </p>
                <p>
                  <strong>Product type :</strong> {product.type}
                </p>
                <p>
                  <strong>Product weight :</strong> {product.weight}
                </p>
                <p>
                  <strong>Product age range :</strong> {product.age_range}
                </p>
                <p>
                  <strong>Product authenticity card :</strong>{' '}
                  {product.authenticity_card}
                </p>
                <p>
                  <strong>Product price :</strong> {product.price}
                </p>
                <p>
                  <strong>Product shipping fees :</strong>{' '}
                  {product.shipping_fees}
                </p>
                <p>
                  <strong>Product seller id :</strong> {product.seller.id}
                </p>
                <p>
                  <strong>Product shop id :</strong> {product.shop_id}
                </p>
                <p>
                  <strong>Product location :</strong>{' '}
                  {product.Detail_product.localization}
                </p>
                <p>
                  <strong>Product belly plate :</strong>{' '}
                  {product.Detail_product.belly_plate}
                </p>
                <p>
                  <strong>Product gender :</strong>{' '}
                  {product.Detail_product.gender}
                </p>
                <p>
                  <strong>Product year :</strong> {product.Detail_product.year}
                </p>
                <p>
                  <strong>Product eyes :</strong> {product.Detail_product.eyes}
                </p>
                <p>
                  <strong>Product hair :</strong> {product.Detail_product.hair}
                </p>
                <p>
                  <strong>Product description :</strong>{' '}
                  {product.Detail_product.description}
                </p>
                <p>
                  <strong>Product status :</strong>{' '}
                  {product.Detail_product.status}
                </p>
                {showImages && (
                  <img src={product.Media[0].photo} alt="product" />
                )}

                <button id="show_img" type="button" onClick={handleShowImages}>
                  {showImages ? 'Masquer les images' : 'Afficher les images'}
                </button>

                <div className="product-actions">
                  <button type="button">Edit</button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
