import './CreateMyStore.scss';

export default function CreateMyStore() {
  return (
    <div className="cms">
      <h1>Create my store</h1>
      <form>
        <div className="cms-form">
          <div className="cms-form_item cms-form_item_left">
            <h2>Pick a name</h2>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name..."
              required
            />
          </div>

          <div className="cms-form_item cms-form_item_right">
            <h2>Are you a professional or an individual?</h2>

            <label htmlFor="professional">
              <input
                type="radio"
                id="professional"
                name="user-type"
                value="professional"
                required
              />
              Professional
            </label>

            <label htmlFor="individual">
              <input
                type="radio"
                id="individual"
                name="user-type"
                value="individual"
                required
              />
              Individual
            </label>
          </div>
        </div>
        <button type="submit">Create my store</button>
      </form>
    </div>
  );
}
