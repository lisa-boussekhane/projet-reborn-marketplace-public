import './AdminShops.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminShops() {
  return (
    <div className="shop-card">
      <div className="shop-info">
        <p>Shop: NOM</p>
      </div>
      <div className="shop-actions">
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    </div>
  );
}
