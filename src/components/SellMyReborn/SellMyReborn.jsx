import './SellMyReborn.scss';
import { useState } from 'react';
import { useAuth } from '../React-Context/AuthContext';

export default function SellMyReborn() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
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
    localization: '',
    belly_plate: '',
    gender: '',
    eyes: '',
    hair: '',
    description: '',
    status: '',
  });

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
      // afficher produit crée en console
      setMessage('Congratulations ! Your product has been created.');
      console.log('Form Data:', formData);
    } catch (error) {
      setMessage('Failed to create product. Please try again.');
      console.error('Failed to create product', error.message);
    }
  };
  return (
    <div>
      <h3>Sell your reborn</h3>
      {message && (
        <p
          className={`message ${
            message.includes('Error') ? 'error' : 'success'
          }`}
        >
          {message}
        </p>
      )}
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
                value={formData.localization}
                onChange={handleChange}
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
              <select
                name="belly_plate"
                id="authenticity"
                value={formData.belly_plate}
                onChange={handleChange}
              >
                <option value="auth">Belly plate?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="gen">Gender</option>
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
              </select>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="stat">Status</option>
                <option value="new">New</option>
                <option value="resell">Resell</option>
              </select>
              <select
                name="authenticity_card"
                id="authenticity_card"
                value={formData.authenticity_card}
                onChange={handleChange}
              >
                <option value="auth">Authenticity card?</option>
                <option value="yes">Yes</option>
                <option value="No">No</option>
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
              <select
                name="eyes"
                id="eyes"
                value={formData.eyes}
                onChange={handleChange}
              >
                <option value="feature">Eyes</option>
                <option value="blue">Blue</option>
                <option value="brown">Brown</option>
                <option value="green">Green</option>
                <option value="other">Other</option>
              </select>
              <select
                name="hair"
                id="hair"
                value={formData.hair}
                onChange={handleChange}
              >
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
              name="description"
              id="desc"
              maxLength="250"
              style={{ resize: 'none' }}
              value={formData.description}
              onChange={handleChange}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga,
              rerum. Iure voluptatem, necessitatibus fugit, officia ipsa tempora
              non facere voluptatibus voluptatum eaque quidem doloribus?
              Nesciunt porro nisi id consequuntur ratione.
            </textarea>
          </div>

          <div className="sell__btn">
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}
