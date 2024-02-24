import './Payment.scss';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../React-Context/CartContext';

export default function Payment({ onPaymentConfirmed }) {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { clearCart, cart } = useCart();
  const amount = searchParams.get('amount');
  const baseAmount = amount;

  // conversion en centimes pour stripe
  const convertedAmout = baseAmount * 100;

  console.log(convertedAmout);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

      const formData = {
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
          body: JSON.stringify(formData),
        });

        if (!token) {
          setErrorMessage('Please log in.'); // message si la personne n'est pas connectée
          return;
        }
        if (response.ok) {
          const data = await response.json();
          console.log('paiement effectué:', data);
          onPaymentConfirmed();
          console.log('payment confirmed:', onPaymentConfirmed);
          const productIds = cart.map((item) => item.id);
          console.log(productIds);
          const storedUserId = localStorage.getItem('userId');
          console.log(storedUserId);
          const createOrder = await fetch('http://localhost:3000/createorder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // token récupéré dans le local storage
            },
            body: JSON.stringify({
              userId: storedUserId,
              productIds: productIds,
            }),
          });

          // Check the response from createorder route
          if (createOrder.ok) {
            clearCart();
            const createOrderData = await createOrder.json();

            console.log(
              'Order created successfully:',
              createOrderData,
              createOrderData.order_numbers
            );

            const orderNumbers = createOrderData.order_numbers;
            const successMessageOrder =
              orderNumbers.length === 1
                ? `Payment confirmed, thank you for your order! Your order number is: ${orderNumbers.join(
                    ', '
                  )}`
                : `Payment confirmed, thank you for your order! Your order numbers are: ${orderNumbers.join(
                    ', '
                  )}`;

            setSuccessMessage(successMessageOrder);
          } else {
            console.error(
              'erreur dans la création de la commande:',
              createOrder.status
            );
          }
        } else {
          console.error('erreur servuer :', response.status);

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
                name="name"
                id="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="payment__elem">
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last name"
                required
              />
            </div>
            <div className="payment__elem">
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone number"
                required
              />
            </div>
            <div className="payment__elem">
              <input
                type="email"
                name="email"
                id="email"
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
                required
              />
            </div>
            <div className="payment__elem2">
              <input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                required
              />
            </div>
            <div className="payment__elem2">
              <input
                type="text"
                name="zip"
                id="zip"
                placeholder="Zip code"
                pattern="[0-9]*"
                required
              />
            </div>
            <div className="payment__elem2">
              <input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                required
              />
            </div>
            <div className="payment__elem2">
              <input
                type="text"
                name="country"
                id="country"
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
