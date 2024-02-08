import './ContactUs.scss';

export default function ContactUs() {
  return (
    <div>
      <div className="contact-us">
        <div className="contact-us-img">
          <img src="./page-contact-us.jpg" alt="contact us" />
        </div>
        <div className="contact-us_form">
          <h1>Contact us</h1>

          <form>
            <div className="form-row">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
            </div>
            <textarea placeholder="Message" required />

            <button type="submit">Send</button>
          </form>
        </div>
      </div>

      <div className="about-us-buttons">
        <button type="button" id="btn-account">
          Create an account
        </button>
        <button type="button" id="btn-adopt">
          Adopt a reborn
        </button>
        <button type="button" id="btn-contact">
          Contact us
        </button>
      </div>
      <div className="about-us_button_images">
        <img src="./icon-create-account.jpg" alt="adopt a reborn" />
        <img src="./icon-aar.jpg" alt="adopt a reborn" />
        <img src="./icon-contact-us.jpg" alt="contact us" />
      </div>
    </div>
  );
}
