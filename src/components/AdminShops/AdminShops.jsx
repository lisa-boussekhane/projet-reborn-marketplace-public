import './AdminShops.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'semantic-ui-react';

export default function AdminShops() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [shops, setShops] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [updatingShopId, setUpdatingShopId] = useState(null);
  const [formData, setFormData] = useState({
    name: selectedShop ? selectedShop.name : '',
  });

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

  const handleEditShop = (shop) => {
    setSelectedShop(shop);
    setUpdatingShopId(shop.id);
    setIsModalOpen(true);
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, name: value };
    });
  };

  const handleUpdateShop = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/admin/updateshop/${updatingShopId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: formData.name }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update shop.');
      }

      setShops((prevShops) =>
        prevShops.map((shop) =>
          shop.id === updatingShopId ? { ...shop, formData } : shop
        )
      );
      setIsModalOpen(false);
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
              <NavLink to="/adminorders" activeClassName="active-link">
                All Orders
              </NavLink>
            </div>
          </>
        )}
      </div>
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
                  <button type="button" onClick={() => handleEditShop(shop)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteShop(shop.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Edit Shop</Modal.Header>
        <form onSubmit={handleUpdateShop}>
          <Modal.Content className="modale">
            {selectedShop && (
              <>
                <label htmlFor="updatedShopName">
                  Shop name
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleNameChange}
                  />
                </label>
                <p>
                  <strong>Shop id:</strong> {selectedShop.id}
                </p>
                <p>
                  <strong>Shop creator id :</strong> {selectedShop.user_id}
                </p>
              </>
            )}
          </Modal.Content>
          <Modal.Actions className="modale">
            <Button style={{ backgroundColor: 'green' }} primary>
              Update Shop
            </Button>
            <Button secondary onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
    </div>
  );
}
