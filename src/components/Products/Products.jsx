/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */
import './Products.scss';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Card, Image, Checkbox, Button } from 'semantic-ui-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [message, setMessage] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_API_URL}/products`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log();
      }
    };
    fetchProducts();
  }, [id]);

  const filterProducts = async () => {
    try {
      let filteredData;
      if (selectedSubcategories.length > 0) {
        const response = await fetch(
          `${import.meta.env.REACT_APP_API_URL}/products`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              subcategory: selectedSubcategories,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch filtered products');
        }

        filteredData = await response.json();
        if (filteredData.length === 0) {
          setMessage('No products match your search');
        }
      } else {
        filteredData = products;
      }

      setProducts(filteredData);
    } catch (error) {
      console.log('Error fetching filtered products:', error);
    }
  };

  const handleCategoryClick = (category) => {
    const isSameCategory = selectedCategory === category;
    if (isSameCategory) {
      setSelectedCategory(null);
      setSelectedSubcategories([]);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategories([]);
    }

    filterProducts();
  };

  const handleSubcategoryClick = (subcategory) => {
    let updatedSubcategories;
    if (selectedSubcategories.includes(subcategory)) {
      updatedSubcategories = selectedSubcategories.filter(
        (item) => item !== subcategory
      );
    } else {
      updatedSubcategories = [...selectedSubcategories, subcategory];
    }
    setSelectedSubcategories(updatedSubcategories);
    filterProducts();
  };

  const renderSubcategories = () => {
    const subcategoriesMap = {
      type: ['Vinyl', 'Silicone', 'Cuddle'],
      sculptor: [
        'Linde Scherer',
        'Olga Auer',
        'Laura Lee Eagles',
        'Ina Volprich',
      ],
      gender: ['Girl', 'Boy', 'None'],
      age_range: ['Baby', 'Toddler'],
      eyes: ['Closed', 'Brown', 'Blue', 'Green', 'Other'],
      hair: [
        'Bald',
        'Hair painting',
        'Brown',
        'Blonde',
        'Black',
        'Red',
        'Other',
      ],
      belly_plate: ['Yes', 'No'],
      authenticity_card: ['Yes', 'No'],
    };

    return (
      <div className="subcategories__container">
        {subcategoriesMap[selectedCategory].map((subcategory) => (
          <Button
            key={subcategory}
            onClick={() => handleSubcategoryClick(subcategory)}
            style={{
              padding: '5px',
              fontSize: '1.3em',
              marginLeft: '0.7em',
            }}
          >
            {subcategory}
          </Button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="categories__menu">
        <h4 onClick={() => handleCategoryClick('type')}>Type</h4>
        {selectedCategory === 'type' && renderSubcategories()}
        <h4 onClick={() => handleCategoryClick('sculptor')}>Sculptor</h4>
        {selectedCategory === 'sculptor' && renderSubcategories()}
        <h4 onClick={() => handleCategoryClick('gender')}>Gender</h4>
        {selectedCategory === 'gender' && renderSubcategories()}
        <h4 onClick={() => handleCategoryClick('age_range')}>Age range</h4>
        {selectedCategory === 'age_range' && renderSubcategories()}
        <h4 onClick={() => handleCategoryClick('eyes')}>Eyes</h4>
        {selectedCategory === 'eyes' && renderSubcategories()}
        <h4 onClick={() => handleCategoryClick('hair')}>Hair</h4>
        {selectedCategory === 'hair' && renderSubcategories()}
        <h4 onClick={() => handleCategoryClick('belly_plate')}>Belly plate</h4>
        {selectedCategory === 'belly_plate' && renderSubcategories()}
        <h4 onClick={() => handleCategoryClick('authenticity_card')}>
          Authenticity card
        </h4>
        {selectedCategory === 'authenticity_card' && renderSubcategories()}
      </div>

      {message && (
        <div className="no-results">
          <p>{message}</p>
        </div>
      )}

      <div className="products__wrapper">
        {products.map((product) => (
          <div
            key={product.id}
            className={`products__card ${product.sold ? 'vendu' : ''}`}
          >
            <div className="products__card__item">
              <Card className="product-img">
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
