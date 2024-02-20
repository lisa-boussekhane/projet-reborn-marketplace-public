import './SellMyReborn.scss';
import { useState } from 'react';
import { useAuth } from '../React-Context/AuthContext';

export default function SellMyReborn() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    kit_name: '',
    year: '',
    size: '',
    title: '',
    sculptor: '',
    type: '',
    weight: '',
    age_range: '',
    authenticity_card: '',
    price: '',
    shipping_fees: '',
  });
  const [productId, setProductId] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `http://localhost:3000/createproduct/${user.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to create product. HTTP status: ${response.status}`
        );
      }
      console.log('Form Data:', formData);
      const productData = await response.json();
      setProductId(productData.id);
    } catch (error) {
      console.error('Failed to create product', error.message);
    }
  };
  return (
    <div className="sell__box">
      <form
        onSubmit={handleSubmit}
        method="post"
        encType="multipart/form-data"
        className="sell__container"
      >
        <div className="sell__wrapper">
          <input type="file" name="image" />
          <input type="submit" />

          <div className="sell__col1">
            <h3>I want to sell my reborn</h3>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <input
              type="text"
              name="kit_name"
              id="kitname"
              value={formData.kit_name}
              onChange={handleChange}
              placeholder="Name of the kit"
            />
            <input
              type="number"
              name="year"
              id="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Creation Year"
            />
            <input
              type="text"
              name="size"
              id="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Size (in inches)"
            />
            <input
              type="text"
              name="weight"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Weight (in pounds)"
            />
            <input
              type="text"
              name="localization"
              id="localization"
              placeholder="Localization"
            />
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </div>
          <div className="sell__col2">
            <input
              type="text"
              name="sculptor"
              id="sculptor"
              value={formData.sculptor}
              onChange={handleChange}
              placeholder="Sculptor of the kit"
            />
            <select name="belly" id="authenticity">
              <option value="auth">Belly plate?</option>
              <option value="new">Yes</option>
              <option value="resell">No</option>
            </select>
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
              name="shipping_fees"
              id="fees"
              placeholder="Shipping fees"
              value={formData.shipping_fees}
              onChange={handleChange}
            />
          </div>
          <div className="sell__col3">
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="material">Type</option>
              <option value="vinyl">Vinyl</option>
              <option value="silicone">Silicone</option>
              <option value="cuddle">Cuddle</option>
            </select>
            <select
              name="age_range"
              id="age"
              value={formData.age_range}
              onChange={handleChange}
            >
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
          <textarea
            name="desc"
            id="desc"
            maxLength="250"
            style={{ resize: 'none' }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga,
            rerum. Iure voluptatem, necessitatibus fugit, officia ipsa tempora
            non facere voluptatibus voluptatum eaque quidem doloribus? Nesciunt
            porro nisi id consequuntur ratione.
          </textarea>
        </div>

        <div className="sell__btn">
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
}
