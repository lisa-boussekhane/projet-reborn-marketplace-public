import './Result.scss';
import { useEffect, useState } from 'react';
import { Input, CardHeader, CardContent, Card, Image } from 'semantic-ui-react';

export default function Result() {
  const [products, setProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/result?search=${search}`);
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
    <div className="result__container">
      <div className="result__input">
        <Input focus placeholder="Reborns match your search" />
      </div>
      <div className="result__box">
        <div className="result__card">
          {products.map((product) => (
            <Card key={product.id}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={false}
              />
              <CardContent>
                <CardHeader>{product.title}</CardHeader>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
