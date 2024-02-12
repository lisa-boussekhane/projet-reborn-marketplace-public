import './MyStore.scss';
import { CardHeader, CardContent, Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function MyStore({ counter }) {
  return (
    <>
      <div className="seller__container">
        <div className="seller__title">
          <h2>You have {counter} Reborns on sale</h2>
        </div>
        <div className="seller__rating">
          <h3>
            Your seller's rating: <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </h3>
        </div>
        <div className="seller__btn">
          <button type="submit">
            <h3 className="seller__subtitle">Add an article</h3>
          </button>
        </div>
      </div>
      <div className="seller__card">
        <Card>
          {/* image à modifier plus tard */}
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            wrapped
            ui={false}
          />
          <CardContent>
            <CardHeader>Title</CardHeader>
          </CardContent>
          <CardContent extra>
            {/* lien à modifier plus tard */}
            <Link to="/">
              <Icon name="edit" />
              Edit
            </Link>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
