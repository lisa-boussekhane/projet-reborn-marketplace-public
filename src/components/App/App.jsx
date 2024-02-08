import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import ResetPassword from '../ResetPassword/ResetPassword';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MyAccount from '../MyAccount/MyAccount';
import MyStore from '../MyStore/MyStore';
import Cart from '../Cart/Cart';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/deleteaccount" element={<DeleteAccount />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/mystore" element={<MyStore counter={6} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
