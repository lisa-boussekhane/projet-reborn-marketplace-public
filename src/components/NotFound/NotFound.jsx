import './NotFound.scss';

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>Error 404</h1>
      <h2>Sorry, the page you're looking for doesn't exist</h2>
      <button type="button" id="go-homepage">
        Return to homepage
      </button>
      <img src="./404.jpg" alt="suspicious baby" />
    </div>
  );
}
