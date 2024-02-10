import './Products.scss';
import { CardHeader, CardContent, Card, Image } from 'semantic-ui-react';

export default function Products() {
  return (
    <>
      <div className="products__menu">
        <div className="products__category">
          <h3>Category 1</h3>
        </div>
        <div className="products__item">
          <p>Sub-category 1</p>
          <p>Sub-category 2</p>
        </div>
        <div className="products__category">
          <h3>Category 2</h3>
        </div>
        <div className="products__item">
          <p>Sub-category 1</p>
          <p>Sub-category 2</p>
        </div>
        <div className="products__category">
          <h3>Category 3</h3>
        </div>
        <div className="products__item">
          <p>Sub-category 1</p>
          <p>Sub-category 2</p>
          <p>Sub-category 3</p>
        </div>
        <div className="products__category">
          <h3>Category 4</h3>
        </div>
        <div className="products__item">
          <p>Sub-category 1</p>
          <p>Sub-category 2</p>
          <p>Sub-category 3</p>
          <p>Sub-category 4</p>
        </div>
      </div>
      <div className="products__wrapper">
        <div className="products__card">
          <Card>
            {/* image à modifier plus tard */}
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              wrapped
              ui={false}
            />
            <CardContent>
              {/* Ajouter lien qui redirige le user sur la page Product */}
              <CardHeader>Title</CardHeader>
            </CardContent>
          </Card>

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
    </>
  );
}
