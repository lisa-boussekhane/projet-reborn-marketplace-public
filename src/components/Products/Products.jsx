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
      {/* <div className="products__menu">
        {products.map((product) => (
          <div key={product.id} className="products__category">
            <h3>{product.type}</h3>
            <ul className="products__item">
              <li>{product.sculptor}</li>
              <li>{product.detail_product.gender}</li>
              <li>{product.age_range}</li>
              <li>{product.detail_product.eyes}</li>
              <li>{product.detail_product.hair}</li>
              <li>{product.detail_product.belly_plate}</li>
              <li>{product.authenticity_card}</li>
            </ul>
          </div>
        ))}
      </div> */}

      <div className="products__wrapper">
        {products.map((product) => (
          <div key={product.id} className="products__card">
            <div className="products__card__item">
              <Card>
                <Image src="./reborn1.jpg" wrapped ui={false} />
                <Card.Content>
                  <NavLink to={`/product/${product.id}`}>
                    <Card.Header>{product.title}</Card.Header>
                  </NavLink>
                </Card.Content>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
