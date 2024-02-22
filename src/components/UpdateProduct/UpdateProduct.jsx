import './UpdateProduct.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function UpdateProduct() {
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [formData, setFormData] = useState();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://localhost:3000/product/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setProduct(data);

        setFormData({
          title: data.title || '',
          kit_name: data.kit_name || '',
          year: data.year || '',
          size: data.size || '',
          weight: data.weight || '',
          localization: data.Detail_product?.localization || '',
          sculptor: data.sculptor || '',
          price: data.price || '',
          shipping_fees: data.shipping_fees || '',
          belly_plate: data.Detail_product?.belly_plate || '',
          gender: data.Detail_product?.gender || '',
          status: data.Detail_product?.status || '',
          authenticity_card: data.authenticity_card || '',
          type: data.type || '',
          age_range: data.Detail_product?.age_range || '',
          eyes: data.Detail_product?.eyes || '',
          hair: data.Detail_product?.hair || '',
          description: data.Detail_product?.description || '',
        });
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

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
      const formDataToUpdate = new FormData();

      // Append each form field to FormData
      const keys = Object.keys(formData);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key === 'photo') {
          const files = formData[key];
          for (let j = 0; j < files.length; j++) {
            formDataToUpdate.append(key, files[j]);
          }
        } else {
          formDataToUpdate.append(key, formData[key]);
        }
      }

      await fetch(`http://localhost:3000/product/${id}`, {
        method: 'PATCH',
        body: formDataToUpdate,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Congratulations! Your product has been updated.');
      console.log('Form Data:', formData);
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('Failed to create product. Please try again.');
    }
  };

  return (
    <div>
      <h3>Update your product</h3>
      {message && (
        <p
          className={`message ${
            message.includes('Error') ? 'error' : 'success'
          }`}
        >
          {message}
        </p>
      )}
      {product && product.Detail_product && (
        <div className="sell__box">
          <form
            onSubmit={handleSubmit}
            method="post"
            encType="multipart/form-data"
            className="sell__container"
          >
            <div className="sell__wrapper">
              <div className="sell__img">
                {product &&
                  product.Media &&
                  product.Media.length > 0 &&
                  product.Media[0].photo && (
                    <img
                      src={`http://localhost:5173/${product.Media[0].photo}`}
                      alt={`Product ${product.id}`}
                    />
                  )}

                <input
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  accept="image/*"
                  multiple
                  className="larger-input"
                />
              </div>

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
              <input type="submit" value="Update product" />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
