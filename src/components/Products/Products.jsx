import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import './Products.scss';

export default function Products() {
  const [products, setProducts] = useState([]);
  const handleFilter = (e) => {
    const value = e.target.value;
    const filtered = products.filter((product) =>
      product.type.includes('Vinyl')
    );
    setProducts(filtered);
  };

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
          <h3>Vinyl</h3>
        </div>

        {/* <ul className="products__item" onClick={handleFilter}>
          {products.map((product) => (
            <>
              <li>{product.sculptor}</li>
              <li>{product.gender}</li>
              <li>{product.age_range}</li>
              <li>{product.eyes}</li>
              <li>{product.hair}</li>
              <li>{product.belly_plate}</li>
              <li>{product.authenticity_card}</li>
            </>
          ))}
        </ul> */}

        <div className="products__category">
          <h3>Silicone</h3>
        </div>
        <ul className="products__item">
          <li>Kit Sculptor</li>
          <li>Gender</li>
          <li>Age range</li>
          <li>Eyes</li>
          <li>Hair</li>
          <li>Belly plate</li>
          <li>Authenticity card</li>
        </ul>

        <div className="products__category">
          <h3>Cuddle</h3>
        </div>
        <ul className="products__item">
          <li>Kit Sculptor</li>
          <li>Gender</li>
          <li>Age range</li>
          <li>Eyes</li>
          <li>Hair</li>
          <li>Belly plate</li>
          <li>Authenticity card</li>
        </ul>
      </div>

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
