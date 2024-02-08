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
import Homepage from '../Homepage/Homepage';
import AboutUs from '../AboutUs/AboutUs';
import NotFound from '../NotFound/NotFound';
import ContactUs from '../ContactUs/ContactUs';
import CookiesPolicy from '../CookiesPolicy/CookiesPolicy';
import TermsOfSales from '../TermsOfSales/TermsOfSales';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import CreateMyStore from '../CreateMyStore/CreateMyStore';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/deleteaccount" element={<DeleteAccount />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/mystore" element={<MyStore counter={6} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/cookiespolicy" element={<CookiesPolicy />} />
        <Route path="/termsofsale" element={<TermsOfSales />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/createmystore" element={<CreateMyStore />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
