import ReactDOM from 'react-dom/client';


import { BrowserRouter } from 'react-router-dom';

import App from '@/components/App/App';
import { AuthProvider } from './components/AuthContext';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
