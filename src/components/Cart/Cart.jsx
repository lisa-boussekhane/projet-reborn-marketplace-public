import './Cart.scss';
import {
  CardMeta,
  CardHeader,
  CardContent,
  Card,
  Icon,
  Image,
} from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { Icon as Icons } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../React-Context/CartContext';

export default function Cart() {
  const [errorMessage, setErrorMessage] = useState('');
  const [user_id, setUser_id] = useState(null);
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');

    if (!storedToken) {
      navigate('/login');
    }
  }, [navigate]);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const calculateTotalDeliveryFees = () => {
    return cart.reduce((total, item) => total + item.shipping_fees, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalDeliveryFees();
  };

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
        setUser_id(data.targetedUser.id);
        console.log(data.targetedUser.id);
      } catch (error) {
        console.log({ error });
      }
    };
    handleInfo();
  }, []);
  const handleCheckout = () => {
    // vérifier que le user ne peut pas acheter ses propres produits
    const isOwnProduct = cart.some((item) => item.user_id === user_id);
    console.log('isOwnProduct:', isOwnProduct);
    if (isOwnProduct) {
      // afficher un message d'erreur si il essaie
      setErrorMessage('You cannot purchase your own product.');
      console.log('You cannot purchase your own product.');
      return;
    }
    const totalAmount = calculateTotal();
    navigate(`/payment?amount=${totalAmount}`);
  };

  return (
    <div>
      <div className="error-message error">{errorMessage}</div>
      <div className="cart__box container">
        <div className="cart__container container">
          <h1 className="cart__title">
            Your shopping cart contains {cart ? cart.length : 0} items
          </h1>
          <div className="cart__elem">
            {Array.isArray(cart) &&
              cart.map((item) => (
                <Card key={item.id}>
                  <Image src={`${item.Media[0].photo}`} wrapped ui={false} />
                  <CardContent>
                    <CardHeader>{item.title}</CardHeader>
                    <CardMeta>
                      <span className="category">{item.type}</span>
                    </CardMeta>
                  </CardContent>
                  <CardContent extra className="price-trash">
                    ${item.price}
                    <Icon
                      name="trash"
                      onClick={() => handleRemoveFromCart(item.id)}
                    />
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        <div className="amount__container container">
          <div className="amount">
            <h1>Total</h1>
            <p className="amount__subtotal">
              Subtotal : ${calculateSubtotal()}
            </p>
            <p className="amount__delay">
              Delivery : ${calculateTotalDeliveryFees()}
            </p>
            <p className="amount__total">
              Total (VAT included) : ${calculateTotal()}
            </p>
            <div className="checkout-button-container">
              <button
                type="submit"
                value="Checkout"
                className="pay__btn"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>
          <div className="payment__method">
            <h2>We accept</h2>
          </div>
          <div className="payment__details">
            <ul className="payment__list">
              <li>
                <Icons icon="logos:mastercard" style={{ fontSize: '2.5em' }} />
              </li>
              <li>
                <Icons icon="logos:visa" />
              </li>
              <li>
                <Icons
                  icon="simple-icons:americanexpress"
                  style={{ color: '#006fac', fontSize: '2.5em' }}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
