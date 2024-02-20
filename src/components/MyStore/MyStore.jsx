import './MyStore.scss';
<<<<<<< HEAD
import { CardHeader, CardContent, Card, Icon, Image } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
=======
import {
  CardHeader,
  CardContent,
  Card,
  Icon,
  Image,
  Button,
  Modal
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
>>>>>>> ff80a2b0fc9a83104f43ccef14b011e60e971dba
import { useAuth } from '../React-Context/AuthContext';

export default function MyStore() {
  const { user } = useAuth();
<<<<<<< HEAD
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Cannot fetch products');
        }
        const data = await response.json();
        setProducts(data);

        // Filtering products based on user id
        const filtered = products.filter((product) => product.user_id === 3);
        setMyProducts(filtered);
      } catch (error) {
        console.error('Cannot fetch products:', error);
      }
    };
    fetchProducts();
  }, [products]);

  return (
    <>
      <div className="seller__container">
        <div className="seller__title">
          <h2>You have Reborns on sale</h2>
=======
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
>>>>>>> ff80a2b0fc9a83104f43ccef14b011e60e971dba
        </div>
      )}

      <div className="seller__button">
        <NavLink to="/sellmyreborn">
          <input type="submit" value="Add an article" />
        </NavLink>
      </div>

<<<<<<< HEAD
      <div className="seller__card">
        {products.map((product) => (
          <div key={product.id} className="seller__items">
            <Card>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={false}
              />
              <CardContent>
                <CardHeader>{product.title}</CardHeader>
              </CardContent>
              <CardContent extra>
                <Link to="/">
                  <Icon name="edit" />
                  Edit
                </Link>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
=======
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
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
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
>>>>>>> ff80a2b0fc9a83104f43ccef14b011e60e971dba
    </>
  );
}
