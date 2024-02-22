import './Cart.scss';
import {
  CardMeta,
  CardHeader,
  CardContent,
  Card,
  Icon,
  Image,
} from 'semantic-ui-react';
import { Icon as Icons } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../React-Context/CartContext';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

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

  const handleCheckout = () => {
    const totalAmount = calculateTotal();
    navigate(`/payment?amount=${totalAmount}`);
  };

  return (
    <div className="cart__box">
      <div className="cart__container">
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

      <div className="amount__container">
        <div className="amount">
          <h1>Total</h1>
          <p className="amount__subtotal">Subtotal : ${calculateSubtotal()}</p>
          <p className="amount__delay">
            Delivery : ${calculateTotalDeliveryFees()}
          </p>
          <p className="amount__total">
            Total (VAT included) : ${calculateTotal()}
          </p>
          <div className="checkout-button-container">
            <button type="submit" value="Checkout" onClick={handleCheckout}>
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
  );
}
