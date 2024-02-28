import './AdminOrders.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminUsers() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const storedToken = localStorage.getItem('jwtToken');
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/orders', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        });

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
        </div>
      </div>
      <div className="order-card">
        {orders.map((order) => (
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
