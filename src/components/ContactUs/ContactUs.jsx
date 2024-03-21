import './ContactUs.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sendingError, setSendingError] = useState('');

  const sendForm = async (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      message: message,
    };

    try {
      const response = await fetch(
        `${import.meta.env.REACT_APP_API_URL}/contactus`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setSent(true);
        setSendingError('');
      } else {
        setSent(false);
        setSendingError(
          data.message || "Une erreur s'est produite lors de l'envoi."
        );
      }
    } catch (erreur) {
      console.error("Erreur lors de l'envoi du formulaire:", erreur);
      setSent(false);
      setSendingError("Une erreur s'est produite lors de l'envoi.");
    }
  };

  return (
    <div>
      <div className="contact-us">
        <div className="contact-us-img">
          <img src="./page-contact-us.jpg" alt="contact us" />
        </div>
        <div className="contact-us_form">
          <h1>Contact us</h1>

          <form onSubmit={sendForm}>
            <div className="form-row">
              <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <textarea
              placeholder="Message"
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            {sent && (
              <p style={{ color: 'green' }}>Message sent successfully !</p>
            )}
            {sendingError && (
              <p style={{ color: 'red' }}>
                Error in sending the message, please try again...
              </p>
            )}
            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <div className="contact-us-buttons">
        <NavLink to="/signup">
          <button type="button" id="btn-account">
            Create an account
          </button>
          <img src="./icon-create-account.jpg" alt="create account" />
        </NavLink>
        <NavLink to="/reborns">
          <button type="button" id="btn-adopt">
            Adopt a reborn
          </button>
          <img src="./icon-aar.jpg" alt="adopt a reborn" />
        </NavLink>
        <NavLink to="/contactus">
          <button type="button" id="btn-contact">
            Contact us
          </button>
          <img src="./icon-contact-us.jpg" alt="contact us" />
        </NavLink>
      </div>
    </div>
  );
}
