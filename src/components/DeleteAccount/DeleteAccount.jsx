import './DeleteAccount.scss';

export default function DeleteAccount() {
  return (
    <div className="delete__container">
      <div>
        <h1>Delete Account</h1>
      </div>
      <div className="delete__p">
        <p>
          If you decide to delete your account, this action cannot be undone.
        </p>
        <p>All your personal data will also be deleted.</p>
      </div>

      <button type="submit" value="submit" className="delete__btn">
        Delete My Account
      </button>
    </div>
  );
}
