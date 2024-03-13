import './Admin.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="admin-page-home">
      <div className="admin-header">Admin dashboard</div>
      <div className="admin-nav">
        <NavLink to="/adminusers" activeClassName="active-link">
          All Users
        </NavLink>
        <NavLink to="/adminshops" activeClassName="active-link">
          All Shops
        </NavLink>
        <NavLink to="/adminproducts" activeClassName="active-link">
          All Products
        </NavLink>

        <NavLink to="/adminorders" activeClassName="active-link">
          All Orders
        </NavLink>
      </div>
    </div>
  );
}
