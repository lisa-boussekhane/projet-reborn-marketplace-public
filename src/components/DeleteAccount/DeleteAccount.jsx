import './DeleteAccount.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

export default function DeleteAccount() {
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `${import.meta.env.REACT_APP_API_URL}/user`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // token récupéré dans le local storage
          },
        }
      );

      if (response.status === 204) {
        // compte supprimé
        setDeleteConfirmed(true);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        console.error('Failed to delete account');
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    } finally {
      // Fermer la modal après la suppression
      setModalOpen(false);
    }
  };

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const cancelDelete = () => {
    setModalOpen(false);
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
          <h1>Delete Account</h1>

          <div className="delete__p">
            <p>
              If you decide to delete your account, this action cannot be
              undone.
            </p>
            <p>All your personal data will also be deleted.</p>
          </div>

          <Button
            color="red"
            onClick={handleDeleteClick}
            className="btn_delete"
          >
            Delete My Account
          </Button>

          <Modal
            open={modalOpen}
            onClose={cancelDelete}
            size="mini"
            closeIcon
            dimmer="blurring"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              height: '300px',
            }}
          >
            <Header icon="trash" content="Confirm Deletion" />
            <Modal.Content>
              <p>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button color="grey" onClick={cancelDelete}>
                <Icon name="remove" /> Cancel
              </Button>
              <Button
                color="red"
                className="btn_delete"
                onClick={confirmDelete}
              >
                <Icon name="checkmark" /> Delete
              </Button>
            </Modal.Actions>
          </Modal>
        </>
      )}
    </div>
  );
}
