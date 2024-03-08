import './MyAccount.scss';
import { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function MyAccount() {
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState();
  const [userOrders, setUserOrders] = useState([]);
  const [userSales, setUserSales] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedOrderRating, setSelectedOrderRating] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ratedSeller, setRatedSeller] = useState([]);

  useEffect(() => {
    const handleInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://localhost:3000/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, []);

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
      const response = await fetch(`http://localhost:3000/user`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

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
        const orders = await fetch(`http://localhost:3000/user/orders`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, []);

  useEffect(() => {
    const fetchUserSales = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const sales = await fetch(`http://localhost:3000/user/sales`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!sales.ok) {
          throw new Error('Error fetching user orders');
        }

        const salesData = await sales.json();
        const { soldProducts } = salesData;
        console.log('Orders sold Data:', soldProducts);
        setUserSales(soldProducts);
      } catch (error) {
        console.log({ error });
      }
    };
    fetchUserSales();
  }, []);

  const handleUploadInvoice = async (e, orderId) => {
    e.preventDefault();

    const invoiceFormData = new FormData();
    invoiceFormData.append('order_id', orderId);
    invoiceFormData.append('invoice', e.target.invoice.files[0]);

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch('http://localhost:3000/orders', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: invoiceFormData,
      });

      if (!response.ok) {
        throw new Error('Error uploading invoice');
      }

      const responseData = await response.json();
      console.log(responseData);

      setUserSales((prevUserSales) =>
        prevUserSales.map((soldProduct) =>
          soldProduct.id === orderId
            ? { ...soldProduct, invoice: responseData.invoice }
            : soldProduct
        )
      );

      setMessage('Invoice uploaded successfully');
    } catch (error) {
      console.error('Error uploading invoice:', error.message);
      setMessage('Failed to upload invoice. Please try again.');
    }
  };

  const fetchRating = (shopNumb, rating) => {
    const token = localStorage.getItem('jwtToken');
    fetch(`http://localhost:3000/shop/${shopNumb}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating }),
    })
      .then((response) => response.json())
      .catch((error) => console.error('Error:', error));
  };

  // Checks if there is rated seller in localStorage
  useEffect(() => {
    const storedOrders = localStorage.getItem('ratedSeller');
    if (storedOrders) {
      setRatedSeller(JSON.parse(storedOrders));
    }
  }, []);

  // Saves seller rating to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('ratedSeller', JSON.stringify(ratedSeller));
  }, [ratedSeller]);

  // Clears message about already rated seller
  const clearMessage = () => {
    setMessage('');
  };

  // Clears message after 3 seconds when it changes
  useEffect(() => {
    const delay = setTimeout(() => {
      clearMessage();
    }, 3000);

    // Function that cancels a timeout
    return () => clearTimeout(delay);
  }, [message]);

  const handleRating = (shopNumb, rating, orderId) => {
    if (ratedSeller.includes(orderId)) {
      setMessage('You have already rated this seller.');
      return;
    }

    console.log(
      `l'utilisateur a cliqué sur ${rating} pour le shop ${shopNumb}`
    );
    setNewRating(rating);
    fetchRating(shopNumb, rating);
    setMessage('Thank you for your feedback ');
    setSelectedRating(rating);
    setSelectedOrderRating(rating);
    setSelectedOrder(orderId);
    setRatedSeller([...ratedSeller, orderId]);
  };

  return (
    <div>
      <div className="account_menu">
        <h1>My Account</h1>

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
          <li>
            <Link to="/messages">Chat</Link>
          </li>
          <li>
            <Link to="/deleteaccount">Delete account</Link>
          </li>
        </ul>
      </div>
      <div className="account__container">
        <div id="profile">
          <div className="profile__information">
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

                <input
                  type="submit"
                  value="Save update"
                  className="save__btn"
                />
              </form>
            )}
          </div>
        </div>

        <div className="orders">
          <div className="title">
            <h1>Orders and Returns</h1>
          </div>
          <div className="order__container">
            {userOrders.length === 0 ? (
              <p>You haven't purchased any product yet</p>
            ) : (
              <ul className="order__list">
                {(!userInfo || userOrders.length === 0) && (
                  <p>You haven't purchased any product yet</p>
                )}
                {userOrders.map((order) => (
                  <li key={order.id} className="order__item">
                    <div className="order__details">
                      <Link
                        to={`/messages/${order.Product.seller.id}`}
                        className="contact__seller"
                      >
                        Contact the seller
                      </Link>
                      <p>
                        <strong>Order number :</strong> {order.order_number}
                      </p>
                      <p>
                        <strong>Date :</strong> {order.date}
                      </p>
                      <p>
                        <strong>Order Status :</strong> {order.status}
                      </p>
                      <p>
                        <strong>Product name :</strong> {order.Product.title}
                      </p>
                      <p>
                        <strong>Delivery address :</strong>{' '}
                        {order.buyer.address} {order.buyer.city}{' '}
                        {order.buyer.state}
                      </p>
                      <p>
                        <strong>Price : </strong> {order.Product.price}
                      </p>
                      <p>
                        <strong>Seller username : </strong>{' '}
                        {order.Product.seller.username}
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
                                View Invoice
                              </a>
                            </p>
                          ) : (
                            'Invoice not available'
                          )}
                        </strong>
                      </p>
                      <p>
                        <strong> Rate seller : </strong>
                        {message && (
                          <p
                            className={`message ${
                              message.includes('Error') ? 'error' : 'success'
                            }`}
                          >
                            {message}
                          </p>
                        )}
                      </p>
                      <div className="rating-buttons-container">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            type="button"
                            className="star-btn"
                            onClick={() =>
                              handleRating(
                                order.Product.shop_id,
                                rating,
                                order.id
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faStar}
                              color={
                                ratedSeller.includes(order.id) &&
                                rating <= selectedOrderRating
                                  ? 'gold'
                                  : 'gray'
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="orders">
          <div className="title">
            <h1>Products sold</h1>
          </div>
          <div className="order__container">
            {userSales.length === 0 ? (
              <p>You haven't sold any products yet</p>
            ) : (
              <ul className="order__list">
                {(!userInfo || userSales.length === 0) && (
                  <p>You haven't sold any products yet</p>
                )}
                {userSales.map((soldProduct, index) => (
                  <li key={index} className="order__item">
                    <div className="order__details">
                      <Link
                        to={`/messages/${soldProduct.buyer.id}`}
                        className="contact__buyer"
                      >
                        Contact the buyer
                      </Link>
                      <p>
                        <strong>Order number :</strong>{' '}
                        {soldProduct.order_number}
                      </p>
                      <p>
                        <strong>Date :</strong> {soldProduct.date}
                      </p>
                      <p>
                        <strong>Price :</strong> {soldProduct.Product.price}
                      </p>
                      <p>
                        <strong>Order Status :</strong> {soldProduct.status}
                      </p>
                      <p>
                        <strong>Product name :</strong>{' '}
                        {soldProduct.Product.title}
                      </p>
                      <p>
                        <strong>Name :</strong> {soldProduct.buyer.first_name}{' '}
                        {soldProduct.buyer.last_name}
                      </p>
                      <p>
                        <strong>Delivery address :</strong>{' '}
                        {soldProduct.buyer.address} {soldProduct.buyer.zip_code}{' '}
                        {soldProduct.buyer.city} {soldProduct.buyer.state}{' '}
                      </p>
                      <p>
                        <strong>Phone :</strong> {soldProduct.buyer.phone}
                      </p>
                      <p>
                        <strong>Order Status :</strong> {soldProduct.status}
                      </p>
                      <p>
                        <strong>
                          {soldProduct.invoice
                            ? `Invoice: ${soldProduct.invoice}`
                            : 'Invoice not available'}
                        </strong>
                      </p>

                      {soldProduct.invoice ? (
                        <p>
                          <a
                            href={soldProduct.invoice}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Invoice
                          </a>
                        </p>
                      ) : (
                        <form
                          encType="multipart/form-data"
                          onSubmit={(event) =>
                            handleUploadInvoice(event, soldProduct.id)
                          }
                        >
                          <input type="file" name="invoice" accept=".pdf" />
                          <button type="submit">Upload Invoice</button>
                          {message && (
                            <p
                              className={`message ${
                                message.includes('Error') ? 'error' : 'success'
                              }`}
                            >
                              {message}
                            </p>
                          )}
                        </form>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
