import './AdminShops.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminShops() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [shops, setShops] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
        const response = await fetch('http://localhost:3000/admin/shops');

        if (!response.ok) {
          throw new Error('Failed to fetch shops.');
        }

        const data = await response.json();
        setShops(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [navigate, userRole]);

  const handleDeleteShop = async (shopId) => {
    try {
      const response = await fetch('http://localhost:3000/admin/shop', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: shopId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete product.');
      }

      const updatedShops = shops.filter((shop) => shop.id !== shopId);
      setShops(updatedShops);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shop-card">
      {errorMessage && <p>{errorMessage}</p>}
      {userRole === 'Admin' && (
        <>
          {shops.map((shop) => (
            <div key={shop.id} className="shop-info">
              <p>
                <strong>Shop id:</strong> {shop.id}
              </p>
              <p>
                <strong>Shop name :</strong> {shop.name}
              </p>
              <p>
                <strong>Shop creator id :</strong> {shop.user_id}
              </p>

              <div className="shop-actions">
                <button type="button">Edit</button>
                <button type="button" onClick={() => handleDeleteShop(shop.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
