import './MyStore.scss';
import {
  CardHeader,
  CardContent,
  Card,
  Icon,
  Image,
  Button,
  Modal,
} from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../React-Context/AuthContext';

export default function MyStore() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleteShopModalOpen, setDeleteShopModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // vérifier si l'utilisateur est connecté
    if (!user) {
      // rediriger l'utilisateur vers la page de connexion
      navigate('/login');
    } else {
      // Récupérer les informations du shop du backend
      const fetchShopDetails = async () => {
        try {
          const token = localStorage.getItem('jwtToken');
          const response = await fetch(
            `http://localhost:3000/shop/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            const shopData = await response.json();
            setShop(shopData);
          } else {
            console.error('Failed to fetch shop details');
            // si le magasin n'est pas disponible, rediriger vers la page de création du magasin
            navigate('/createmystore');
          }
        } catch (error) {
          console.error('An unexpected error occurred', error);
        }
      };

      fetchShopDetails();
    }
  }, [user, navigate]);

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `http://localhost:3000/product/${productId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        // actualise la liste des produits après la suppression
        const updatedProducts = shop.Products.filter(
          (product) => product.id !== productId
        );
        setShop((prevShop) => ({
          ...prevShop,
          Products: updatedProducts,
        }));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
    }
  };

  const openDeleteModal = (productId) => {
    setDeleteProductId(productId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteProductId(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
      closeDeleteModal();
    }
  };

  const deleteShop = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:3000/shop/${user.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await response.json(); // Parse the response JSON

      if (response.status === 200 || response.status === 204) {
        // Shop deleted successfully, you may want to redirect or perform additional actions
        console.log('Shop deleted successfully');
        setMessage('Your shop has been deleted successfully.');
      } else {
        console.error('Failed to delete shop');
        setMessage(`Error. Please try again.`);
      }
    } catch (error) {
      console.error('An unexpected error occurred', error);
      setMessage('Error. Please try again.');
    }
  };
  const openDeleteShopModal = () => {
    setDeleteShopModalOpen(true);
  };

  const closeDeleteShopModal = () => {
    setDeleteShopModalOpen(false);
  };

  const confirmDeleteShop = () => {
    deleteShop(); // Utilisez await pour vous assurer que la suppression est effectuée avant de fermer la modale
    closeDeleteShopModal();
  };

  return (
    <>
      <>
        {shop && (
          <div className="seller__container">
            <div className="seller__title">
              <h2>
                You have {shop.Products ? shop.Products.length : 0} Reborns on
                sale
              </h2>
              {message && (
                <p
                  className={`message ${
                    message.includes('Error') ? 'error' : 'success'
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
            <div className="seller__buttons">
              <div className="seller__button">
                <NavLink to="/sellmyreborn">
                  <input type="submit" value="Add an article" />
                </NavLink>
              </div>
              <div className="seller__button">
                <input
                  type="submit"
                  value="Delete shop"
                  onClick={() => openDeleteShopModal()}
                />
              </div>
            </div>
          </div>
        )}

        {shop && (
          <div className="seller__card">
            {shop.Products.map((product) => (
              <div key={product.id} className="products__card">
                <div className="products__card__item">
                  <Card>
                    <Image src="./reborn1.jpg" wrapped ui={false} />
                    <Card.Content>
                      <NavLink to={`/product/${product.id}`}>
                        <Card.Header>{product.title}</Card.Header>
                      </NavLink>
                    </Card.Content>
                    <Card.Content extra className="card-content">
                      <Button
                        color="blue"
                        as={Link}
                        to={`/sellmyreborn/${product.id}`}
                      >
                        Edit
                      </Button>
                      <Icon
                        name="trash"
                        className="trash-icon"
                        onClick={() => openDeleteModal(product.id)}
                      />
                    </Card.Content>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        )}
        <Modal
          open={deleteModalOpen}
          onClose={closeDeleteModal}
          size="mini"
          dimmer="blurring"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: '300px',
          }}
        >
          <Modal.Header>Confirm Deletion</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this product?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button positive onClick={confirmDelete}>
              Confirm
            </Button>
          </Modal.Actions>
        </Modal>
      </>
      <Modal
        open={isDeleteShopModalOpen}
        onClose={closeDeleteShopModal}
        size="mini"
        dimmer="blurring"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '200px',
        }}
      >
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete your shop? This will delete all your
            products.
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={closeDeleteShopModal}>
            Cancel
          </Button>
          <Button positive onClick={confirmDeleteShop}>
            Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
