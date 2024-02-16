import ReactDOM from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from '@/components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/React-Context/AuthContext';
import { CartProvider } from './components/React-Context/CartContext';
import './styles/index.scss';

const stripePromise = loadStripe(
  'pk_test_51OkOJnAA29sLu6FEl6eRHqbeQxLxgC6i4ncde88Q6v52tFqRGi11OW0d3fcZnWWyiXlX9RMzI6xisKrMxFQanibD00GF43xsXW'
);

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
