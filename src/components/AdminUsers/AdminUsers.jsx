import './AdminUsers.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminUsers() {
  return (
    <div className="user-card">
      <div className="user-info">
        <p>User: NOM</p>
      </div>
      <div className="user-actions">
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    </div>
  );
}
