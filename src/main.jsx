import ReactDOM from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from '@/components/App/App';
import { BrowserRouter } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';

import { AuthProvider } from './components/React-Context/AuthContext';
import { CartProvider } from './components/React-Context/CartContext';

import './styles/index.scss';

const stripePromise = loadStripe(
  `${import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY}`
);

const meta = {
  title: 'Adopt A Reborn',
  description:
    'A marketplace offering the sale and resale of reborn dolls. Here, you have the assurance of purchasing an authentic reborn doll.',
  canonical: 'https://adoptareborn.com',
  meta: {
    charset: 'utf-8',
    name: {
      keywords:
        'reborn,baby reborn,reborn doll,reborn marketplace,reborn dolls',
    },
  },
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DocumentMeta
      title={meta.title}
      description={meta.description}
      canonical={meta.canonical}
      meta={meta.meta}
    >
      <AuthProvider>
        <CartProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </CartProvider>
      </AuthProvider>
    </DocumentMeta>
  </BrowserRouter>
);
