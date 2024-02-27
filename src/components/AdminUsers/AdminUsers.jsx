import './AdminUsers.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function AdminUsers() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    if (userRole !== 'Admin') {
      setErrorMessage('You do not have the permissions to access this page.');

      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/users');

        if (!response.ok) {
          throw new Error('Failed to fetch users.');
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [navigate, userRole]);

  return (
    <div className="user-card">
      {errorMessage && <p>{errorMessage}</p>}
      {userRole === 'Admin' && (
        <>
          {users.map((user) => (
            <div key={user.id} className="user-info">
              <p>
                <strong>User id:</strong> {user.id}
              </p>
              <p>
                <strong>User first_name :</strong> {user.first_name}
              </p>
              <p>
                <strong>User last_name :</strong> {user.last_name}
              </p>
              <p>
                <strong>User username :</strong> {user.username}
              </p>
              <p>
                <strong>User email :</strong> {user.email}
              </p>
              <p>
                <strong>User date of birth :</strong>
                {user.date_of_birth}
              </p>
              <p>
                <strong>User phone :</strong> {user.phone}
              </p>
              <p>
                <strong>User adress :</strong> {user.adress}
              </p>
              <p>
                <strong>User zip_code :</strong> {user.zip_code}
              </p>
              <p>
                <strong>User city :</strong> {user.city}
              </p>
              <p>
                <strong>User state :</strong> {user.state}
              </p>
              <p>
                <strong>User role :</strong> {user.role}
              </p>
              <p>
                <strong>User pro :</strong> {user.pro}
              </p>
              <p>
                <strong>User duns :</strong> {user.duns}
              </p>
              <div className="user-actions">
                <button type="button">Edit</button>
                <button type="button">Delete</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
