import './Result.scss';
import { useEffect } from 'react';
import { Input, CardHeader, CardContent, Card, Image } from 'semantic-ui-react';

export default function Result() {
  useEffect(() => {
    fetch('http://localhost:3000/result')
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="result__container">
      <div className="result__input">
        <Input focus placeholder="121 Reborns match your search" />
      </div>
      <div className="result__box">
        <div className="result__card">
          <Card>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              wrapped
              ui={false}
            />
            <CardContent>
              <CardHeader>Title</CardHeader>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
