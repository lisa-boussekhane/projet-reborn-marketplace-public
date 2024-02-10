import './SellMyReborn.scss';

export default function SellMyReborn() {
  return (
    <>
      <div className="sell__container">
        <img
          src="./homepage3.jpeg"
          alt="reborn on sale"
          className="sell__img"
        />
        <h3>Add images and videos</h3>
      </div>

      <form action="" method="get">
        <div className="sell__wrapper">
          <div className="sell__col1">
            <h3>I want to sell my reborn</h3>
            <input
              type="text"
              name="kitname"
              id="kitname"
              placeholder="Name of the kit"
            />
            <input
              type="number"
              name="year"
              id="year"
              placeholder="Creation Year"
            />
            <input
              type="text"
              name="size"
              id="size"
              placeholder="Size (in inches)"
            />
            <input
              type="text"
              name="weight"
              id="weight"
              placeholder="Weight (in pounds)"
            />
            <input
              type="text"
              name="localization"
              id="localization"
              placeholder="Localization"
            />
            <input type="text" name="price" id="price" placeholder="Price" />
          </div>

          <div className="sell__col2">
            <input
              type="text"
              name="sculptor"
              id="sculptor"
              placeholder="Sculptor of the kit"
            />
            <input
              type="number"
              name="belly"
              id="belly"
              placeholder="Belly plate"
            />
            <select name="gender" id="gender">
              <option value="gen">Gender</option>
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </select>
            <select name="status" id="status">
              <option value="stat">Status</option>
              <option value="new">New</option>
              <option value="resell">Resell</option>
            </select>
            <select name="authenticity" id="authenticity">
              <option value="auth">Authenticity card?</option>
              <option value="new">Yes</option>
              <option value="resell">No</option>
            </select>
            <input
              type="text"
              name="fees"
              id="fees"
              placeholder="Shipping fees"
            />
          </div>

          <div className="sell__col3">
            <select name="type" id="type">
              <option value="material">Type</option>
              <option value="vinyl">Vinyl</option>
              <option value="silicone">Silicone</option>
              <option value="cuddle">Cuddle</option>
            </select>
            <select name="age" id="age">
              <option value="range">Age range</option>
              <option value="baby">Baby</option>
              <option value="toddler">Toddler</option>
            </select>
            <select name="eyes" id="eyes">
              <option value="feature">Eyes</option>
              <option value="blue">Blue</option>
              <option value="brown">Brown</option>
              <option value="green">Green</option>
              <option value="other">Other</option>
            </select>
            <select name="hair" id="hair">
              <option value="detail">Hair</option>
              <option value="painting">Hair painting</option>
              <option value="brown">Brown hair</option>
              <option value="blonde">Blonde hair</option>
              <option value="red">Red hair</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="sell__desc">
          <label htmlFor="desc">
            Description:
            <textarea name="desc" id="desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga,
              rerum. Iure voluptatem, necessitatibus fugit, officia ipsa tempora
              non facere voluptatibus voluptatum eaque quidem doloribus?
              Nesciunt porro nisi id consequuntur ratione.
            </textarea>
          </label>
        </div>

        <input type="submit" value="Save" />
      </form>
    </>
  );
}
