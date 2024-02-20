import './MyStore.scss';
import { CardHeader, CardContent, Card, Icon, Image } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useAuth } from '../React-Context/AuthContext';

export default function MyStore() {
  const { user } = useAuth();
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
        </div>
        <div className="seller__rating">
          <h3>
            Your seller's rating: <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </h3>
        </div>
      </div>

      <div className="seller__button">
        <NavLink to="/sellmyreborn">
          <input type="submit" value="Add an article" />
        </NavLink>
      </div>

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
    </>
  );
}
