import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import './Products.scss';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        const data = await response.json();
        setProducts(data);
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
                  <NavLink to={`/product/${product.id}`} />
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
