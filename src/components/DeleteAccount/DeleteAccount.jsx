import './DeleteAccount.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../React-Context/AuthContext';

export default function DeleteAccount() {
  const { user } = useAuth();
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // vérifier si l'utilisateur est connecté
    if (!user) {
      // rediriger l'utilisateur vers la page de connexion
      navigate('/login');
    }
  }, [user, navigate]);
  const handleDeleteClick = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:3000/user/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // token récupéré dans le local storage
        },
      });

      if (response.status === 204) {
        // compte supprimé
        setDeleteConfirmed(true);
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    }
  };

  return (
    <div className="delete__container">
      {deleteConfirmed ? (
        <div>
          <h1>Account Deleted</h1>
          <p>Your account has been successfully deleted.</p>
        </div>
      ) : (
        <>
          <div>
            <h1>Delete Account</h1>
          </div>
          <div className="delete__p">
            <p>
              If you decide to delete your account, this action cannot be undone.
            </p>
            <p>All your personal data will also be deleted.</p>
          </div>

          <button
            type="button"
            className="delete__btn"
            onClick={handleDeleteClick}
          >
            Delete My Account
          </button>
        </>
      )}
    </div>
  );
}
