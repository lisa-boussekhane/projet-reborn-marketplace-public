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

export default function Cart() {
  return (
    <div className="cart__container">
      <h1 className="cart__title">Your shopping cart (X items)</h1>
      <div className="cart__elem">
        <Card>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            wrapped
            ui={false}
          />
          <CardContent>
            <CardHeader>Title</CardHeader>
            <CardMeta>
              <span className="category">Toddler</span>
            </CardMeta>
          </CardContent>
          <CardContent extra>
            <Icon name="dollar sign" />
            price
          </CardContent>
        </Card>
      </div>

      <div className="amount__container">
        <div className="amount">
          <h1>Total</h1>
          <p className="amount__total">Subtotal</p>
          <p className="amount__delay">Delivery</p>
          <p className="amount__total">Total(VAT included)</p>
          <input type="submit" value="Checkout" className="amount__btn" />
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
