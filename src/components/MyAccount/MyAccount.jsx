import './MyAccount.scss';
import { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default function MyAccount() {
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState();
  const [userOrders, setUserOrders] = useState([]);

  const storedUserId = localStorage.getItem('userId');
  useEffect(() => {
    const handleInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(
          `http://localhost:3000/user/${storedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }
        const data = await response.json();
        setUserInfo(data);
        setFormData({
          username: data.targetedUser.username || '',
          first_name: data.targetedUser.first_name || '',
          last_name: data.targetedUser.last_name || '',
          date_of_birth: data.targetedUser.date_of_birth || '',
          phone: data.targetedUser.phone || '',
          pro: data.targetedUser.pro || '',
          duns: data.targetedUser.duns || '',
          email: data.targetedUser.email || '',
          address: data.targetedUser.address || '',
          zip_code: data.targetedUser.zip_code || '',
          city: data.targetedUser.city || '',
          state: data.targetedUser.state || '',
        });
      } catch (error) {
        console.log({ error });
      }
    };
    handleInfo();
  }, [storedUserId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const formDataCopy = { ...prevFormData };

      // Vérifiez si la clé existe avant de mettre à jour
      if (Object.keys(formDataCopy).includes(name)) {
        formDataCopy[name] = value;
      }

      return formDataCopy;
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `http://localhost:3000/user/${storedUserId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error('erreur pendant la modification');
      }

      setMessage(
        'Congratulations! Your personal information has been updated.'
      );

      console.log('user modifié !');
    } catch (error) {
      console.log({ error });
      setMessage('Failed to update your informations. Please try again.');
    }
  };
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const orders = await fetch(
          `http://localhost:3000/user/orders/${storedUserId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!orders.ok) {
          throw new Error('Error fetching user orders');
        }

        const ordersData = await orders.json();
        const { ordersWithDetails } = ordersData;
        console.log('Orders Data:', ordersWithDetails);
        setUserOrders(ordersWithDetails);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchUserOrders();
  }, [storedUserId]);

  return (
    <div className="account__container">
      <div>
        <h1>My Account</h1>
      </div>
      <ul className="account__items">
        <li>
          <Link to="/myaccount#profile">Personal information</Link>
        </li>
        <li>
          <Link to="/myaccount#orders">Orders and returns</Link>
        </li>
        <li>
          <Link to="/mystore">My store</Link>
        </li>
        <li>Chat</li>
        <li>
          <Link to="/deleteaccount">Delete account</Link>
        </li>
      </ul>

      <div id="profile">
        <div className="profile__information ">
          <div className="profile__title">
            <h1>My profile</h1>
            {message && (
              <p
                className={`message ${
                  message.includes('Error') ? 'error' : 'success'
                }`}
              >
                {message}
              </p>
            )}
          </div>
          <div className="profile__subtitle">
            <h2>Information</h2>
          </div>
          {userInfo && userInfo.targetedUser && (
            <form className="profile__elem" onSubmit={handleFormSubmit}>
              <label htmlFor="username">
                Username
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username || ''}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="firstname">
                Firstname
                <input
                  type="text"
                  name="first_name"
                  id="firstname"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="last name">
                Lastname
                <input
                  type="text"
                  name="last_name"
                  id="lastname"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="date of birth">
                Date of birth
                <input
                  type="text"
                  name="date_of_birth"
                  id="date_of_birth"
                  value={formData.date_of_birth || ''}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="phone">
                Phone number
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="email">
                Email address{' '}
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="pro">
                Pro
                <input
                  type="text"
                  name="pro"
                  id="pro"
                  value={formData.pro || ''}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="duns">
                Duns
                <input
                  type="text"
                  name="duns"
                  id="duns"
                  value={formData.duns || ''}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="address">
                Address
                <input
                  type="address"
                  name="address"
                  id="address"
                  value={formData.address || ''}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="zip_code">
                Zip_code
                <input
                  type="zip_code"
                  name="zip_code"
                  id="zip_code"
                  value={formData.zip_code || ''}
                  onChange={handleChange}
                />
              </label>
              <label htmlFor="city">
                City
                <input
                  type="city"
                  name="city"
                  id="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                />
              </label>
              <input type="submit" value="Save" className="save__btn" />
            </form>
          )}
        </div>
      </div>

      <div id="orders">
        <div>
          <h1>Orders and Returns</h1>
        </div>
        <div className="order__container">
          {userOrders.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <ul className="order__list">
              {(!userInfo || userOrders.length === 0) && <p>Loading...</p>}
              {userOrders.map((order) => (
                <li key={order.id} className="order__item">
                  <div className="order__details">
                    <p>
                      <strong>Order number :</strong> {order.order_number}
                    </p>
                    <p>
                      <strong>Date Paid :</strong> {order.date}
                    </p>
                    <p>
                      <strong>Total Paid :</strong> {order.Seller.price}
                    </p>
                    <p>
                      <strong>Order Status :</strong> {order.status}
                    </p>
                    <p>
                      <strong>Product name :</strong> {order.Seller.title}
                    </p>
                    <p>
                      <strong>Delivery address :</strong> {order.Buyer.address}
                    </p>
                    <p>
                      <strong>Price : </strong> {order.Seller.price}
                    </p>
                    <p>
                      <strong>
                        {order.invoice
                          ? order.invoice
                          : 'Invoice not available'}
                      </strong>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
