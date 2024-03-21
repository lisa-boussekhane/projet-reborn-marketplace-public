import './Payment.scss';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Modal, Dimmer, Loader } from 'semantic-ui-react';
import { useCart } from '../React-Context/CartContext';

export default function Payment() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    country: 'United States',
  });
  const [userInformation, setUserInformation] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip_code: '',
    state: '',
    country: 'United States',
  });

  // conversion en centimes pour stripe
  const convertedAmout = baseAmount * 100;
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // récupérer les informations de l'utilisateur au chargement de la page
  useEffect(() => {
    const handleInfo = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(
          `${import.meta.env.REACT_APP_API_URL}/user`,
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
        setUserInformation({
          first_name: data.targetedUser.first_name || '',
          last_name: data.targetedUser.last_name || '',
          phone: data.targetedUser.phone || '',
          email: data.targetedUser.email || '',
          address: data.targetedUser.address || '',
          city: data.targetedUser.city || '',
          zip_code: data.targetedUser.zip_code || '',
          state: data.targetedUser.state || '',
          country: 'United States',
        });
      } catch (error) {
        console.log({ error });
      }
    };
    handleInfo();
  }, []);

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
        setIsModalOpen(true);
        setIsLoading(true);

        const response = await fetch(
          `${import.meta.env.REACT_APP_API_URL}/process-payment`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // token récupéré dans le local storage
            },
            body: JSON.stringify(paymentFormData),
          }
        );

        if (!token) {
          setErrorMessage('Please log in.'); // message si la personne n'est pas connectée
          return;
        }
        if (response.ok) {
          const paymentData = await response.json();
          console.log('Payment processed:', paymentData);

          // mettre à jour les informations de l'utilisateur
          const userUpdateResponse = await fetch(
            `${import.meta.env.REACT_APP_API_URL}/user`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                ...formData,
                country: 'United States',
              }),
            }
          );

          if (!userUpdateResponse.ok) {
            throw new Error('Error during user information update');
          }

          console.log('User information updated!');
          const productIds = cart.map((item) => item.id);
          const sellerIds = cart.map((item) => item.seller.id);
          const createOrder = await fetch(
            `${import.meta.env.REACT_APP_API_URL}/createorder`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // token récupéré dans le local storage
              },
              body: JSON.stringify({
                productIds: productIds,
                sellerIds: sellerIds,
              }),
            }
          );

          // verifier la réponse de la création de la commande
          if (createOrder.ok) {
            clearCart();
            const createOrderData = await createOrder.json();
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

            setIsLoading(false);
            setSuccessMessage(successMessageOrder);
            setTimeout(() => {
              navigate('/myaccount');
            }, 5000);
          } else {
            console.error(
              'erreur dans la création de la commande:',
              createOrder.status
            );
          }
        } else {
          setIsModalOpen(false);
          setIsLoading(false);
        }
      } catch (error) {
        setIsModalOpen(false);
        setIsLoading(false);
        console.error('Error processing payment:', error);
        setErrorMessage('Payment failed. Please try again.');
      }
    }
  };
  return (
    <div className="payment__container">
      <h1 className="payment__title">Payment</h1>

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
                value={formData.first_name || userInformation.first_name}
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
                value={formData.last_name || userInformation.last_name}
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
                value={formData.phone || userInformation.phone}
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
                value={formData.email || userInformation.email}
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
                value={formData.address || userInformation.address}
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
                value={formData.city || userInformation.city}
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
                value={formData.zip_code || userInformation.zip_code}
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
                value={formData.state || userInformation.state}
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
                value={formData.country || userInformation.country}
                placeholder="United States"
                readOnly
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
      <Modal open={isModalOpen} size="tiny">
        <Dimmer active={isLoading}>
          <Loader>Loading...</Loader>
        </Dimmer>
        <Modal.Content>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Modal.Description>
              {successMessage && (
                <div className="success-message success">{successMessage}</div>
              )}
            </Modal.Description>
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
}
