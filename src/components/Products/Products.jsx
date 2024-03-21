import './Products.scss';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Card, Image, Checkbox } from 'semantic-ui-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    type: false,
    sculptor: false,
    gender: false,
    age_range: false,
    eyes: false,
    hair: false,
    belly_plate: false,
    authenticity_card: false,
  });

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

  // Filters
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCheckbox = (filter) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [filter]: !prevFormData[filter], // Inverser la valeur actuelle du filtre
    }));

    // // Toggle the visibility of sub-categories
    // setSubCategoryVisibility((prevVisibility) => ({
    //   ...prevVisibility,
    //   [filter]: !prevVisibility[filter], // Inverser la visibilité actuelle du filtre
    // }));
  };

  const filteredProducts = products.filter((product) => {
    if (!selectedCategory) {
      return true; // Si aucune catégorie n'est sélectionnée, afficher tous les produits
    }
    // Vérifier si la catégorie sélectionnée correspond à une propriété du produit
    return (
      product.type === selectedCategory ||
      product.sculptor === selectedCategory ||
      product.Detail_product.gender === selectedCategory ||
      product.age_range === selectedCategory ||
      product.Detail_product.eyes === selectedCategory ||
      product.Detail_product.hair === selectedCategory ||
      product.Detail_product.belly_plate === selectedCategory ||
      product.authenticity_card === selectedCategory
    );
  });

  return (
    <>
      <div className="products__menu">
        <h4 onClick={() => handleCategoryClick('type')}>Material</h4>

        <Checkbox
          label="Vinyl"
          // checked={formData.type.Vinyl}
          onChange={() => handleCheckbox('Vinyl')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Silicone"
          // checked={formData.type.Silicone}
          onChange={() => handleCheckbox('Silicone')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Cuddle"
          // checked={formData.type.Cuddle}
          onChange={() => handleCheckbox('Cuddle')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />

        <h4>Sculptor</h4>
        <Checkbox
          label="Linde Scherer"
          // checked={formData.sculptor['Linde Scherer']}
          onChange={() => handleCheckbox('Linde Scherer')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Olga Auer"
          // checked={formData.sculptor['Olga Auer']}
          onChange={() => handleCheckbox('Olga Auer')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Laura Lee Eagles"
          checked={formData.sculptor['Laura Lee Eagles']}
          onChange={() => handleCheckbox('Laura Lee Eagles')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Ina Volprich"
          // checked={formData.sculptor['Ina Volprich']}
          onChange={() => handleCheckbox('Ina Volprich')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />

        <h4>Gender</h4>
        <Checkbox
          label="Girl"
          // checked={formData.gender.Girl}
          onChange={() => handleCheckbox('Girl')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Boy"
          // checked={formData.gender.Boy}
          onChange={() => handleCheckbox('Boy')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="None"
          // checked={formData.gender.None}
          onChange={() => handleCheckbox('None')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <h4>Age range</h4>
        <Checkbox
          label="Baby"
          // checked={formData.age_range.Baby}
          onChange={() => handleCheckbox('Baby')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Toddler"
          // checked={formData.age_range.Toddler}
          onChange={() => handleCheckbox('Toddler')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />

        <h4>Eyes</h4>
        <Checkbox
          label="Closed"
          checked={formData.eyes.Closed}
          onChange={() => handleCheckbox('Closed')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Brown"
          checked={formData.eyes.Brown}
          onChange={() => handleCheckbox('Brown')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Blue"
          checked={formData.eyes.Blue}
          onChange={() => handleCheckbox('Blue')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Green"
          checked={formData.eyes.Green}
          onChange={() => handleCheckbox('Green')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="Other"
          checked={formData.eyes.Other}
          onChange={() => handleCheckbox('Other')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />

        <h4>Hair</h4>
        <Checkbox
          label="Bald"
          checked={formData.hair.Bald}
          onChange={() => handleCheckbox('Bald')}
          style={{ fontSize: '1.3em', marginLeft: '0.4em' }}
        />
        <Checkbox
          label="Hair painting"
          checked={formData.hair['Hair painting']}
          onChange={() => handleCheckbox('Hair painting')}
          style={{ fontSize: '1.3em', marginLeft: '0.4em' }}
        />
        <Checkbox
          label="Brown"
          checked={formData.hair.Brown}
          onChange={() => handleCheckbox('Brown')}
          style={{ fontSize: '1.3em', marginLeft: '0.2em' }}
        />
        <Checkbox
          label="Blonde"
          checked={formData.hair.Blonde}
          onChange={() => handleCheckbox('Blonde')}
          style={{ fontSize: '1.3em', marginLeft: '0.2em' }}
        />
        <Checkbox
          label="Black"
          checked={formData.hair.Black}
          onChange={() => handleCheckbox('Black')}
          style={{ fontSize: '1.3em', marginLeft: '0.3em' }}
        />
        <Checkbox
          label="Red"
          checked={formData.hair.Red}
          onChange={() => handleCheckbox('Red')}
          style={{ fontSize: '1.3em', marginLeft: '0.3em' }}
        />
        <Checkbox
          label="Other"
          checked={formData.hair.Other}
          onChange={() => handleCheckbox('Other')}
          style={{ fontSize: '1.3em', marginLeft: '0.3em' }}
        />

        <h4>Belly plate</h4>
        <Checkbox
          label="Yes"
          checked={formData.belly_plate.Yes}
          onChange={() => handleCheckbox('Yes')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="No"
          checked={formData.belly_plate.No}
          onChange={() => handleCheckbox('No')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />

        <h4>Authenticity card</h4>
        <Checkbox
          label="Yes"
          checked={formData.authenticity_card.Yes}
          onChange={() => handleCheckbox('Yes')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
        <Checkbox
          label="No"
          checked={formData.authenticity_card.No}
          onChange={() => handleCheckbox('No')}
          style={{ fontSize: '1.3em', marginLeft: '0.7em' }}
        />
      </div>

      <div className="products__wrapper">
        {filteredProducts.map(
          (product) => (
            console.log(filteredProducts),
            (
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
            )
          )
        )}
      </div>
    </>
  );
}
