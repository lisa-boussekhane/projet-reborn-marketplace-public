import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import './Products.scss';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleKeyDown = (event, category) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setSelectedCategory(category);
    }
  };
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) =>
          product.type === selectedCategory ||
          product.sculptor === selectedCategory ||
          // product.detail_product.gender === selectedCategory ||
          product.age_range === selectedCategory ||
          // product.detail_product.eyes === selectedCategory
          // product.detail_product.hair === selectedCategory
          // product.detail_product.belly_plate === selectedCategory
          product.authenticity_card === selectedCategory
      )
    : products;

  return (
    <>
      <div className="products__menu">
        <div className="products__category">
          <h3>Material</h3>
          <ul className="products__item">
            <li
              onClick={() => handleCategoryClick('Vinyl')}
              onKeyDown={(event) => handleKeyDown(event, 'Vinyl')}
              tabIndex={0}
            >
              Vinyl
            </li>
            <li
              onClick={() => handleCategoryClick('Silicone')}
              onKeyDown={(event) => handleKeyDown(event, 'Silicone')}
              tabIndex={0}
            >
              {' '}
              Silicone
            </li>
            <li
              onClick={() => handleCategoryClick('Cuddle')}
              onKeyDown={(event) => handleKeyDown(event, 'Cuddle')}
              tabIndex={0}
            >
              Cuddle
            </li>
          </ul>
        </div>

        <div className="products__category">
          <h3>Kit Sculptor</h3>
          <ul className="products__item">
            <li
              onClick={() => handleCategoryClick('Linde Scherer')}
              onKeyDown={(event) => handleKeyDown(event, 'Linde Scherer')}
              tabIndex={0}
            >
              Linde Scherer
            </li>
            <li
              onClick={() => handleCategoryClick('Olga Auer')}
              onKeyDown={(event) => handleKeyDown(event, 'Olga Auer')}
              tabIndex={0}
            >
              Olga Auer
            </li>
            <li
              onClick={() => handleCategoryClick('Laura Lee Eagles')}
              onKeyDown={(event) => handleKeyDown(event, 'Laura Lee Eagles')}
              tabIndex={0}
            >
              Laura Lee Eagles
            </li>
            <li
              onClick={() => handleCategoryClick('Ina Volprich')}
              onKeyDown={(event) => handleKeyDown(event, 'Ina Volprich')}
              tabIndex={0}
            >
              Ina Volprich
            </li>
          </ul>
        </div>

        <div className="products__category">
          <h3>Gender</h3>
          <ul className="products__item">
            <li
              onClick={() => handleCategoryClick('Girl')}
              onKeyDown={(event) => handleKeyDown(event, 'Girl')}
              tabIndex={0}
            >
              Girl
            </li>
            <li
              onClick={() => handleCategoryClick('Boy')}
              onKeyDown={(event) => handleKeyDown(event, 'Boy')}
              tabIndex={0}
            >
              {' '}
              Boy
            </li>
            <li
              onClick={() => handleCategoryClick('None')}
              onKeyDown={(event) => handleKeyDown(event, 'None')}
              tabIndex={0}
            >
              None
            </li>
          </ul>
        </div>

        <div className="products__category">
          <h3>Age range</h3>
          <ul className="products__item">
            <li
              onClick={() => handleCategoryClick('Baby')}
              onKeyDown={(event) => handleKeyDown(event, 'Baby')}
              tabIndex={0}
            >
              Baby
            </li>
            <li
              onClick={() => handleCategoryClick('Toddler')}
              onKeyDown={(event) => handleKeyDown(event, 'Toddler')}
              tabIndex={0}
            >
              Toddler
            </li>
          </ul>
        </div>

        <div className="products__category">
          <h3>Eyes</h3>
          <ul className="products__item">
            <li
              onClick={() => handleCategoryClick('Closed')}
              onKeyDown={(event) => handleKeyDown(event, 'Closed')}
              tabIndex={0}
            >
              Closed
            </li>
            <li
              onClick={() => handleCategoryClick('Brown')}
              onKeyDown={(event) => handleKeyDown(event, 'Brown')}
              tabIndex={0}
            >
              Brown
            </li>
            <li
              onClick={() => handleCategoryClick('Blue')}
              onKeyDown={(event) => handleKeyDown(event, 'Blue')}
              tabIndex={0}
            >
              Blue
            </li>
            <li
              onClick={() => handleCategoryClick('Green')}
              onKeyDown={(event) => handleKeyDown(event, 'Green')}
              tabIndex={0}
            >
              Green
            </li>
            <li
              onClick={() => handleCategoryClick('Other')}
              onKeyDown={(event) => handleKeyDown(event, 'Other')}
              tabIndex={0}
            >
              Other
            </li>
          </ul>
        </div>

        <div className="products__category">
          <h3>Hair</h3>
          <ul className="products__item">
            <li
              onClick={() => handleCategoryClick('Bald')}
              onKeyDown={(event) => handleKeyDown(event, 'Bald')}
              tabIndex={0}
            >
              Bald
            </li>
            <li
              onClick={() => handleCategoryClick('Hair painting')}
              onKeyDown={(event) => handleKeyDown(event, 'Hair painting')}
              tabIndex={0}
            >
              Hair painting
            </li>
            <li
              onClick={() => handleCategoryClick('Brown')}
              onKeyDown={(event) => handleKeyDown(event, 'Brown')}
              tabIndex={0}
            >
              Brown
            </li>
            <li
              onClick={() => handleCategoryClick('Blonde')}
              onKeyDown={(event) => handleKeyDown(event, 'Blonde')}
              tabIndex={0}
            >
              Blonde
            </li>
            <li
              onClick={() => handleCategoryClick('Black')}
              onKeyDown={(event) => handleKeyDown(event, 'Black')}
              tabIndex={0}
            >
              Black
            </li>
            <li
              onClick={() => handleCategoryClick('Red')}
              onKeyDown={(event) => handleKeyDown(event, 'Red')}
              tabIndex={0}
            >
              Red
            </li>
            <li
              onClick={() => handleCategoryClick('Other')}
              onKeyDown={(event) => handleKeyDown(event, 'Other')}
              tabIndex={0}
            >
              Other
            </li>
          </ul>
        </div>

        <div className="products__category">
          <h3>Belly plate</h3>
          <ul className="products__item">
            <li
              onClick={() => handleCategoryClick('Yes')}
              onKeyDown={(event) => handleKeyDown(event, 'Yes')}
              tabIndex={0}
            >
              Yes
            </li>
            <li
              onClick={() => handleCategoryClick('No')}
              onKeyDown={(event) => handleKeyDown(event, 'No')}
              tabIndex={0}
            >
              No
            </li>
          </ul>
        </div>

        <div className="products__category">
          <h3>Authenticity card</h3>
          <ul className="products__item">
            <li
              onClick={() => handleCategoryClick('Yes')}
              onKeyDown={(event) => handleKeyDown(event, 'Yes')}
              tabIndex={0}
            >
              Yes
            </li>
            <li
              onClick={() => handleCategoryClick('No')}
              onKeyDown={(event) => handleKeyDown(event, 'No')}
              tabIndex={0}
            >
              No
            </li>
          </ul>
        </div>
      </div>

      <div className="products__wrapper">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`products__card ${product.sold ? 'vendu' : ''}`}
          >
            <div className="products__card__item">
              <Card>
                <NavLink to={`/product/${product.id}`}>
                  {product.Media &&
                    product.Media.length > 0 &&
                    product.Media[0].photo && (
                      <Image
                        src={`${product.Media[0].photo}`}
                        alt={`Product ${product.id}`}
                        wrapped
                        ui={false}
                        className={product.sold ? 'vendu-image' : ''}
                      />
                    )}
                  <Card.Content>
                    {product.sold === true && (
                      <div className="vendu-banner">Sold</div>
                    )}
                    <Card.Header className="product-title">
                      {product.title}
                    </Card.Header>
                  </Card.Content>
                </NavLink>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
