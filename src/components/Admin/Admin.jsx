import './Admin.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const userRole = localStorage.getItem('userRole');
  useEffect(() => {
    if (userRole !== 'Admin') {
      setErrorMessage('You do not have the permissions to access this page.');

      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [navigate, userRole]);

  return (
    <div className="admin-page">
      {errorMessage && <p>{errorMessage}</p>}
      {userRole === 'Admin' && (
        <>
          <div className="admin-header">Admin dashboard</div>
          <div className="admin-nav">
            <NavLink to="/allusers">All Users</NavLink>
            <NavLink to="/allshop">All Shops</NavLink>
            <NavLink to="/allproducts">All Products</NavLink>
          </div>
        </>
      )}
    </div>
  );
}
