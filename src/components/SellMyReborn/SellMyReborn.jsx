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
    photo: [],
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Si le champ est un fichier, stockez le fichier lui-même dans l'état
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: e.target.files,
      });
      console.log(`Files for ${name}:`, e.target.files);
    } else {
      setFormData((prevFormData) => {
        // Utilisez Object.keys() pour obtenir les clés de l'objet
        const formDataCopy = { ...prevFormData };

        // Vérifiez si la clé existe avant de mettre à jour
        if (Object.keys(formDataCopy).includes(name)) {
          formDataCopy[name] = value;
        }

        return formDataCopy;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken');
      const formDataForServer = new FormData();

      // Append each form field to FormData
      const keys = Object.keys(formData);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === 'photo') {
          const files = formData[key];
          for (let j = 0; j < files.length; j++) {
            formDataForServer.append(key, files[j]);
          }
        } else {
          formDataForServer.append(key, formData[key]);
        }
      }
      for (var pair of formDataForServer.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      const response = await fetch(`http://localhost:3000/product/${user.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataForServer, // utilisation de formData comme corps de la requête
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create product. HTTP status: ${response.status}`
        );
      }

      // afficher produit créé en console
      setMessage('Congratulations! Your product has been created.');
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
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              accept="image/*"
              multiple
              className="larger-input"
            />

            <div className="sell__col1">
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="larger-input"
              />
              <input
                type="text"
                name="kit_name"
                id="kitname"
                value={formData.kit_name}
                onChange={handleChange}
                placeholder="Name of the kit"
                className="larger-input"
              />
              <input
                type="number"
                name="year"
                id="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Creation Year"
                className="larger-input"
              />
              <input
                type="text"
                name="size"
                id="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="Size (in inches)"
                className="larger-input"
              />
              <input
                type="text"
                name="weight"
                id="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight (in pounds)"
                className="larger-input"
              />
              <input
                type="text"
                name="localization"
                id="localization"
                value={formData.localization}
                onChange={handleChange}
                placeholder="Location"
                className="larger-input"
              />

              <input
                type="text"
                name="sculptor"
                id="sculptor"
                value={formData.sculptor}
                onChange={handleChange}
                placeholder="Sculptor of the kit"
                className="larger-input"
              />
              <input
                type="text"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="larger-input"
              />
              <input
                type="text"
                name="shipping_fees"
                id="fees"
                placeholder="Shipping fees"
                value={formData.shipping_fees}
                onChange={handleChange}
                className="larger-input"
              />
            </div>
            <div className="sell__col2">
              <select
                name="belly_plate"
                id="authenticity"
                value={formData.belly_plate}
                onChange={handleChange}
                className="larger-input"
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
                className="larger-input"
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
                className="larger-input"
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
                className="larger-input"
              >
                <option value="auth">Authenticity card?</option>
                <option value="yes">Yes</option>
                <option value="No">No</option>
              </select>
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                className="larger-input"
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
                className="larger-input"
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
                className="larger-input"
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
                className="larger-input"
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
          <div className="sell__col3">
            <textarea
              placeholder="Description..."
              name="description"
              id="desc"
              width="300px"
              maxLength="250"
              style={{ resize: 'none', height: '150px', width: '300px' }}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="sell__btn">
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
}
