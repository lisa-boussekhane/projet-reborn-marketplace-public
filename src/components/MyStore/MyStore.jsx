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
import { Link } from 'react-router-dom';
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

  return (
    <>
      {shop && (
        <div className="seller__container">
          <div className="seller__title">
            <h2>
              You have {shop.Products ? shop.Products.length : 0} Reborns on
              sale
            </h2>
          </div>
        </div>
      )}

      <div className="seller__button">
        <input type="submit" value="Add an article" />
      </div>

      {shop && (
        <div className="seller__card">
          {shop.Products.map((product) => (
            <div key={product.id} className="products__card">
              <div className="products__card__item">
                <Card>
                  <Image src="./reborn1.jpg" wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{product.title}</Card.Header>
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
        size="tiny"
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
  );
}
