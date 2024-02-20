import './CreateMyStore.scss';
import { useState } from 'react';
import { useAuth } from '../React-Context/AuthContext';

export default function CreateMyStore() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    userType: '',
  });
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
        `http://localhost:3000/createshop/${user.id}`,
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
        console.log(result); // Handle the response as needed
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
            <h2>Are you a professional or an individual?</h2>

            <label htmlFor="professional">
              <input
                type="radio"
                id="professional"
                name="userType"
                value="professional"
                required
                checked={formData.userType === 'professional'}
                onChange={handleInputChange}
              />
              Professional
            </label>

            <label htmlFor="individual">
              <input
                type="radio"
                id="individual"
                name="userType"
                value="individual"
                required
                checked={formData.userType === 'individual'}
                onChange={handleInputChange}
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
