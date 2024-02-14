import { useState, useEffect } from 'react';
import { Card, Image } from 'semantic-ui-react';
import axios from 'axios';

import './Products.scss';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="products__menu">
        <div className="products__category">
          <h3>Category 1</h3>
        </div>
        <ul className="products__item">
          <li>Sub-category 1</li>
          <li>Sub-category 2</li>
        </ul>
        <div className="products__category">
          <h3>Category 2</h3>
        </div>
        <ul className="products__item">
          <li>Sub-category 1</li>
          <li>Sub-category 2</li>
        </ul>
        <div className="products__category">
          <h3>Category 3</h3>
        </div>
        <ul className="products__item">
          <li>Sub-category 1</li>
          <li>Sub-category 2</li>
          <li>Sub-category 3</li>
        </ul>
        <div className="products__category">
          <h3>Category 4</h3>
        </div>
        <ul className="products__item">
          <li>Sub-category 1</li>
          <li>Sub-category 2</li>
          <li>Sub-category 3</li>
          <li>Sub-category 4</li>
        </ul>
      </div>
      <div className="products__wrapper">
        {products.map((product) => (
          <div key={product.id} className="products__card">
            <div className="products__card__item">
              <Card>
                <Image src="./reborn1.jpg" wrapped ui={false} />
                <Card.Content>
                  {/* Ajouter lien qui redirige le user sur la page Product */}
                  <Card.Header>{product.title}</Card.Header>
                </Card.Content>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
