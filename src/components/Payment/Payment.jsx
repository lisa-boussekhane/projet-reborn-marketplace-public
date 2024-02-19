import './Payment.scss';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get('amount');

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    setLoading(true);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setLoading(false);
      setErrorMessage('Payment failed. Please try again.');
    } else {
      const paymentMethodId = paymentMethod.id;

      const token = localStorage.getItem('jwtToken');

      const formData = {
        paymentMethodId,
        amount,
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
          setErrorMessage('Token not available. Please log in.'); // message si la personne n'est pas connectée
          return;
        }

        if (response.ok) {
          const data = await response.json();
          console.log('paiement effectué:', data);

          const { clientSecret } = data;
          console.log('secret client :', clientSecret);

          const { paymentIntent, error } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: paymentMethodId,
            }
          );

          // réponse de stripe après confirmation du paiement
          console.log('réponse de stripe après confirmation:', {
            paymentIntent,
            error,
          });

          if (error) {
            console.error('erreur dans la confirmation du paiement:', error);
            setLoading(false);
            setErrorMessage('Payment failed. Please try again.');
          } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log('payment confirmé', paymentIntent);
            setLoading(false);
            setSuccessMessage('Payment successful. Thank you!'); // message succès pour l'utilisateur
          } else {
            console.error('PaymentIntent status n\'est pas succeeded');
            setLoading(false);
            setErrorMessage('Payment failed. Please try again.');
          }
        } else {
          console.error('Server error:', response.status);
          setLoading(false);
          setErrorMessage('Payment failed. Please try again.');
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        setLoading(false);
        setErrorMessage('Payment failed. Please try again.');
      }
    }
  };

  return (
    <div className="payment__container">
      <h1 className="payment__title">Payment</h1>
      {loading && <div>Loading...</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
