import './AdminProducts.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminProducts() {
  return (
    <div className="product-card">
      <div className="product-info">
        <p>User: NOM</p>
      </div>
      <div className="product-actions">
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    </div>
  );
}
