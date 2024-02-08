import './DeleteAccount.scss';

export default function DeleteAccount() {
  return (
    <div className="delete__container">
      <div>
        <h1>Delete Account</h1>
      </div>
      <p>If you decide to delete your account, this action cannot be undone.</p>
      <p>All your personal data will also be deleted.</p>
      <input type="submit" value="Delete My Account" />
    </div>
  );
}
