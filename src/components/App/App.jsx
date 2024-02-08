import { Routes, Route } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import ResetPassword from '../ResetPassword/ResetPassword';
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MyAccount from '../MyAccount/MyAccount';

function App() {
  return (
    <div className="app">
      <Header />
      <Footer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/deleteaccount" element={<DeleteAccount />} />
        <Route path="/myaccount" element={<MyAccount />} />
      </Routes>
    </div>
  );
}

export default App;
