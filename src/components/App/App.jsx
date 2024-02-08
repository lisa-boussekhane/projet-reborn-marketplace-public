import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import ResetPassword from '../ResetPassword/ResetPassword';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MyAccount from '../MyAccount/MyAccount';
import Homepage from '../Homepage/Homepage';
import AboutUs from '../AboutUs/AboutUs';
import NotFound from '../NotFound/NotFound';
import ContactUs from '../ContactUs/ContactUs';
import CookiesPolicy from '../CookiesPolicy/CookiesPolicy';
import TermsOfSales from '../TermsOfSales/TermsOfSales';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';

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
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/cookiespolicy" element={<CookiesPolicy />} />
        <Route path="/termsofsale" element={<TermsOfSales />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
