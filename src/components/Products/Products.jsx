import './Products.scss';
import { CardHeader, CardContent, Card, Image } from 'semantic-ui-react';

export default function Products() {
  return (
    <>
      <div className="products__menu">
        <div className="products__category">
          <h3>Category 1</h3>
        </div>
        <ul className="products__item">
          <li>Sub-category 1</li>
          <li>Sub-category 2</li>
        </ul>
        <div className="products__category">
          <h3>Category 2</h3>
        </div>
        <ul className="products__item">
          <li>Sub-category 1</li>
          <li>Sub-category 2</li>
        </ul>
        <div className="products__category">
          <h3>Category 3</h3>
        </div>
        <ul className="products__item">
          <li>Sub-category 1</li>
          <li>Sub-category 2</li>
          <li>Sub-category 3</li>
        </ul>
        <div className="products__category">
          <h3>Category 4</h3>
        </div>
        <ul className="products__item">
          <li>Sub-category 1</li>
          <li>Sub-category 2</li>
          <li>Sub-category 3</li>
          <li>Sub-category 4</li>
        </ul>
      </div>
      <div className="products__wrapper">
        <div className="products__card">
          <div className="products__card__item">
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
          </div>
        </div>
      </div>
    </>
  );
}
