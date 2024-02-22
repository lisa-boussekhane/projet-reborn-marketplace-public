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
          `http://localhost:3000/results?search=${search}`
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
        <div className="result__card">
          {results.map((result) => (
            <Card key={result.id}>
              {' '}
              {/* Ensure each key is unique */}
              <Image
                src={result.photo || 'default_placeholder_url'}
                // Use a default placeholder URL if photo is not available
                wrapped
                ui={false}
              />
              <CardContent>
                <NavLink to={`/product/${result.id}`}>
                  <CardHeader>{result.title}</CardHeader>
                </NavLink>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
