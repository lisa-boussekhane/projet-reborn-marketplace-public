import ReactDOM from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from '@/components/App/App';
import { BrowserRouter } from 'react-router-dom';


import { AuthProvider } from './components/React-Context/AuthContext';
import { CartProvider } from './components/React-Context/CartContext';

import './styles/index.scss';

const stripePromise = loadStripe(
  `${import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY}`
);
// const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
