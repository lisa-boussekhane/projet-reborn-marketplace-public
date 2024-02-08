import './Payment.scss';

export default function Payment() {
  return (
    <div className="payment__container">
      <h1 className="payment__title">Payment</h1>
      <form action="" method="post" className="payment__wrapper">
        <div className="payment__group">
          <div className="payment__elem">
            <h2>Personal Information</h2>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
          </div>
          <div className="payment__elem">
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last name"
              required
            />
          </div>
          <div className="payment__elem">
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone number"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
            />
          </div>
          <div className="payment__elem">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>
        </div>

        <div className="payment__group">
          <div className="payment__elem">
            <h2>Address</h2>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              required
            />
          </div>
          <div className="payment__elem">
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              required
            />
          </div>
          <div className="payment__elem">
            <input
              type="text"
              name="zip"
              id="zip"
              placeholder="Zip code"
              pattern="[0-9]*"
              required
            />
          </div>
          <div className="payment__elem">
            <input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              required
            />
          </div>
          <div className="payment__elem">
            <input
              type="text"
              name="country"
              id="country"
              placeholder="United States"
              required
            />
          </div>
        </div>

        <div className="payment__group">
          <div className="payment__elem">
            <h2>Card Details</h2>
            <input
              type="text"
              name="cardname"
              id="cardname"
              placeholder="Card holder's name"
              required
            />
          </div>
          <div className="payment__elem">
            <input
              type="tel"
              name="cardnumber"
              id="cardnumber"
              placeholder="Card number"
              required
            />
          </div>
        </div>

        <div className="payment__group">
          <div className="payment__elem">
            <input
              type="tel"
              name="card cvv"
              id="card cvv"
              placeholder="CVV"
              required
            />
          </div>
          <div className="payment__elem">
            <input
              type="text"
              name="expdate"
              id="expdate"
              placeholder="MM / YY"
              maxLength={7}
              required
            />
          </div>
        </div>

        <div className="payment__group">
          <div className="payment__elem">
            <button type="submit" className="pay__btn">
              Pay now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
