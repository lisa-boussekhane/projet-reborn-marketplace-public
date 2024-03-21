import './AdminOrders.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const storedToken = localStorage.getItem('jwtToken');
  console.log('Stored Token:', storedToken);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_API_URL}/admin/orders`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch users.');
        }

        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [navigate, storedToken]);

  // filtrer les résultats en fonction de la valeur de searchTerm
  const filteredOrders = searchTerm
    ? orders.filter((order) => {
        return (
          order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.buyer.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.Product.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.buyer.last_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.buyer.address
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.buyer.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.buyer.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.Product.seller.username
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.Product.seller.id === Number(searchTerm) ||
          order.buyer.id === Number(searchTerm) ||
          order.Product.price === Number(searchTerm)
        );
      })
    : orders;

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
            {' '}
            All Products
          </NavLink>
          <NavLink to="/adminorders" activeClassName="active-link">
            All Orders
          </NavLink>
          <div>
            <input
              id="search-input"
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="order-card">
        {filteredOrders.map((order) => (
          <div key={order.id} className="order-info">
            <p>
              <strong>Order id:</strong> {order.id}
            </p>
            <p>
              <strong>Order number :</strong> {order.order_number}
            </p>
            <p>
              <strong>Order date :</strong> {order.date}
            </p>
            <p>
              <strong>Order status :</strong> {order.status}
            </p>
            <p>
              <strong>Title of the product : </strong> {order.Product.title}
            </p>
            <p>
              <strong>Buyer first name : </strong>
              {order.buyer.first_name}
            </p>
            <p>
              <strong>Buyer last name : </strong>
              {order.buyer.last_name}
            </p>
            <p>
              <strong>Buyer id : </strong>
              {order.buyer.id}
            </p>
            <p>
              <strong>Buyer address : </strong>
              {order.buyer.address} {order.buyer.city} {order.buyer.state}
            </p>
            <p>
              <strong>Price : </strong> {order.Product.price}
            </p>
            <p>
              <strong>Seller's username : </strong>{' '}
              {order.Product.seller.username}
            </p>
            <p>
              <strong>Seller id : </strong> {order.Product.seller.id}
            </p>
            <p>
              <strong>
                {order.invoice ? (
                  <p>
                    <a
                      href={order.invoice}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here to see the invoice
                    </a>
                  </p>
                ) : (
                  'Invoice not available'
                )}
              </strong>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
