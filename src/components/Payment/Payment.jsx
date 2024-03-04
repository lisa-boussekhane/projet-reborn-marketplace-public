import './Payment.scss';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../React-Context/CartContext';

export default function Payment() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { clearCart, cart } = useCart();
  const amount = searchParams.get('amount');
  const baseAmount = amount;
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip_code: '',
    state: '',
    country: '',
  });

  // conversion en centimes pour stripe
  const convertedAmout = baseAmount * 100;
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      const formDataCopy = { ...prevFormData };

      if (Object.keys(formDataCopy).includes(name)) {
        formDataCopy[name] = value;
      }

      return formDataCopy;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setErrorMessage('Payment failed. Please try again.');
    } else {
      const paymentMethodId = paymentMethod.id;

      const token = localStorage.getItem('jwtToken');

      const paymentFormData = {
        paymentMethodId,
        convertedAmout,
      };

      try {
        const response = await fetch('http://localhost:3000/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // token récupéré dans le local storage
          },
          body: JSON.stringify(paymentFormData),
        });

        if (!token) {
          setErrorMessage('Please log in.'); // message si la personne n'est pas connectée
          return;
        }
        if (response.ok) {
          const paymentData = await response.json();
          console.log('Payment processed:', paymentData);

          // Update user information
          const userUpdateResponse = await fetch(`http://localhost:3000/user`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          });

          if (!userUpdateResponse.ok) {
            throw new Error('Error during user information update');
          }

          console.log('User information updated!');
          const productIds = cart.map((item) => item.id);
          const sellerIds = cart.map((item) => item.seller.id);
          const createOrder = await fetch('http://localhost:3000/createorder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // token récupéré dans le local storage
            },
            body: JSON.stringify({
              productIds: productIds,
              sellerIds: sellerIds,
            }),
          });

          // Check the response from createorder route
          if (createOrder.ok) {
            clearCart();
            const createOrderData = await createOrder.json();
            setTimeout(() => {
              navigate('/myaccount');
            }, 5000);
            console.log('Order created successfully:', createOrderData);
            const orderNumbers = createOrderData.order_numbers;
            const successMessageOrder =
              orderNumbers.length === 1
                ? `Payment confirmed, thank you for your order! Your order number is: ${orderNumbers.join(
                    ', '
                  )}. Redirecting to my account...`
                : `Payment confirmed, thank you for your order! Your order numbers are: ${orderNumbers.join(
                    ', '
                  )}. Redirecting to my account...`;

            setSuccessMessage(successMessageOrder);
          } else {
            console.error(
              'erreur dans la création de la commande:',
              createOrder.status
            );
          }
        } else {
          setErrorMessage('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        setErrorMessage('Payment failed. Please try again.');
      }
    }
  };

  return (
    <div className="payment__container">
      <h1 className="payment__title">Payment</h1>
      {successMessage && (
        <div className="success-message success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message error">{errorMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="payment__box">
          <h2>Personal information</h2>
          <div className="payment__group">
            <div className="payment__elem">
              <input
                type="text"
                name="first_name"
                id="firstname"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="payment__elem">
              <input
                type="text"
                name="last_name"
                id="lastname"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last name"
                required
              />
            </div>
            <div className="payment__elem">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                required
              />
            </div>
            <div className="payment__elem">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
        </div>
        <div className="payment__box2">
          <h2>Address</h2>
          <div className="payment__group2">
            <div className="payment__elem2">
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="payment__elem2">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="payment__elem2">
              <input
                type="text"
                name="zip_code"
                id="zip_code"
                placeholder="Zip code"
                value={formData.zip_code}
                onChange={handleChange}
                pattern="[0-9]*"
                required
              />
            </div>
            <div className="payment__elem2">
              <input
                type="text"
                name="state"
                id="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
              />
            </div>
            <div className="payment__elem2">
              <input
                type="text"
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="United States"
                required
              />
            </div>
          </div>
        </div>

        <div className="payment__box3">
          <h2>Card Details</h2>
          <CardElement />
        </div>

        <div className="pay__buttons">
          <button type="submit" className="pay__btn">
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}
