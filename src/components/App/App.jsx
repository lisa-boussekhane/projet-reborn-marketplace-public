import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import ResetRequest from '../ResetRequest/ResetRequest';
import ResetPassword from '../ResetPassword/ResetPassword';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MyAccount from '../MyAccount/MyAccount';
import Cart from '../Cart/Cart';
import Homepage from '../Homepage/Homepage';
import AboutUs from '../AboutUs/AboutUs';
import NotFound from '../NotFound/NotFound';
import ContactUs from '../ContactUs/ContactUs';
import CookiesPolicy from '../CookiesPolicy/CookiesPolicy';
import TermsOfSales from '../TermsOfSales/TermsOfSales';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import CreateMyStore from '../CreateMyStore/CreateMyStore';
import Products from '../Products/Products';
import SellMyReborn from '../SellMyReborn/SellMyReborn';
import Faq from '../Faq/Faq';
import HowItWorks from '../HowItWorks/HowItWorks';
import Result from '../Result/Result';
import Payment from '../Payment/Payment';
import Product from '../Product/Product';
import MyStore from '../MyStore/MyStore';
import UpdateProduct from '../UpdateProduct/UpdateProduct';

function App() {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  const handlePaymentConfirmed = () => {
    setPaymentConfirmed(true);
  };

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ResetRequest />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="/deleteaccount" element={<DeleteAccount />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mystore" element={<MyStore />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/cookiespolicy" element={<CookiesPolicy />} />
        <Route path="/termsofsale" element={<TermsOfSales />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/createmystore" element={<CreateMyStore />} />
        <Route
          path="/product/:id"
          element={<Product paymentConfirmed={paymentConfirmed} />}
        />
        <Route path="/sellmyreborn" element={<SellMyReborn />} />
        <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/results" element={<Result />} />
        <Route
          path="/payment"
          element={<Payment onPaymentConfirmed={handlePaymentConfirmed} />}
        />
        <Route path="/reborns" element={<Products />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/howitworks" element={<HowItWorks />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
