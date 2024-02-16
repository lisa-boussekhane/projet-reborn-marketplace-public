import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from '@/components/App/App';
import { AuthProvider } from './components/React-Context/AuthContext';
import { CartProvider } from './components/React-Context/CartContext';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
