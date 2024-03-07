import './AdminShops.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'semantic-ui-react';

export default function AdminShops() {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [updatingShopId, setUpdatingShopId] = useState(null);
  const storedToken = localStorage.getItem('jwtToken');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: selectedShop ? selectedShop.name : '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/shops', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        });

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
  }, [navigate, storedToken]);

  const handleDeleteShop = async (shopId) => {
    try {
      const response = await fetch('http://localhost:3000/admin/shop', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
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
            Authorization: `Bearer ${storedToken}`,
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

  // filtrer les résultats en fonction de la valeur de searchTerm
  const filteredShops = searchTerm
    ? shops.filter((shop) => {
        return (
          shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shop.id === Number(searchTerm) ||
          shop.user_id === Number(searchTerm)
        );
      })
    : shops;

  return (
    <div>
      <div className="admin-page">
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
          <div>
            <input
              id="search-input"
              type="text"
              placeholder="Search shops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="shop-card">
        {filteredShops.map((shop) => (
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

              <button type="button" onClick={() => handleDeleteShop(shop.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
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
