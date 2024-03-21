import './CreateMyStore.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateMyStore() {
  const [formData, setFormData] = useState({
    name: '',
    pro: '',
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `${import.meta.env.REACT_APP_API_URL}/createshop`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setMessage('Congratulations! Your store has been created.');
        console.log(result);
        navigate('/mystore');
      } else {
        setMessage('Error. Please try again.');
        console.error('Failed to create shop');
      }
    } catch (error) {
      setMessage('Error. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="cms">
      <h1>Create my store</h1>
      {message && (
        <p
          className={`message ${
            message.includes('Error') ? 'error' : 'success'
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="cms-form">
          <div className="cms-form_item cms-form_item_left">
            <h2>Pick a name</h2>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name..."
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="cms-form_item cms-form_item_right">
            <h2>Are you a professional ?</h2>

            <label htmlFor="professional">
              <input
                type="radio"
                id="professional"
                name="pro"
                value="yes"
                required
                checked={formData.pro === 'yes'}
                onChange={handleInputChange}
              />
              Yes
            </label>

            <label htmlFor="professional">
              <input
                type="radio"
                id="professional"
                name="pro"
                value="no"
                required
                checked={formData.pro === 'no'}
                onChange={handleInputChange}
              />
              No
            </label>
          </div>
        </div>
        <button type="submit">Create my store</button>
      </form>
    </div>
  );
}
