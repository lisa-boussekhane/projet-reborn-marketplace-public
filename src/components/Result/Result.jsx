import './Result.scss';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Input, CardHeader, CardContent, Card, Image } from 'semantic-ui-react';

export default function Result() {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.REACT_APP_API_URL}/results?search=${search}`
        );
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        const data = await response.json();
        setResults(data.results);
        console.log(results);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [search]);

  return (
    <div className="result__container">
      <div className="result__input">
        <h2> {`${results ? results.length : 0} Reborns match your search`}</h2>
      </div>
      <div className="result__box">
        {results.map((result) => (
          <div
            key={result.id}
            className={`result__card ${result.sold ? 'vendu' : ''}`}
          >
            <Card>
              {' '}
              <NavLink to={`/product/${result.id}`}>
                <Image
                  src={result.photo}
                  wrapped
                  ui={false}
                  className={result.sold ? 'vendu-image' : ''}
                />
                <CardContent className="product-title">
                  {result.sold === true && (
                    <div className="vendu-banner">Sold</div>
                  )}
                  <CardHeader>{result.title}</CardHeader>
                </CardContent>
              </NavLink>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
