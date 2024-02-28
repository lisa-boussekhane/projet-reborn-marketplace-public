import './AdminProducts.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'semantic-ui-react';

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showImages, setShowImages] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatingProductId, setUpdatingProductId] = useState(null);
  const storedToken = localStorage.getItem('jwtToken');
  const [formData, setFormData] = useState({
    title: selectedProduct ? selectedProduct.title : '',
    kit_name: selectedProduct ? selectedProduct.kit_name : '',
    sculptor: selectedProduct ? selectedProduct.sculptor : '',
    size: selectedProduct ? selectedProduct.size : '',
    type: selectedProduct ? selectedProduct.type : '',
    weight: selectedProduct ? selectedProduct.weight : '',
    age_range: selectedProduct ? selectedProduct.age_range : '',
    authenticity_card: selectedProduct ? selectedProduct.authenticity_card : '',
    price: selectedProduct ? selectedProduct.price : '',
    shipping_fees: selectedProduct ? selectedProduct.shipping_fees : '',
    localization: selectedProduct ? selectedProduct.localization : '',
    belly_plate: selectedProduct ? selectedProduct.belly_plate : '',
    gender: selectedProduct ? selectedProduct.gender : '',
    year: selectedProduct ? selectedProduct.year : '',
    eyes: selectedProduct ? selectedProduct.eyes : '',
    hair: selectedProduct ? selectedProduct.hair : '',
    description: selectedProduct ? selectedProduct.description : '',
    status: selectedProduct ? selectedProduct.status : '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/products', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products.');
        }

        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [navigate, storedToken]);

  const handleShowImages = () => {
    setShowImages(!showImages);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch('http://localhost:3000/admin/product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete product.');
      }

      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setUpdatingProductId(product.id);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const formDataCopy = { ...prevFormData };

      if (Object.keys(formDataCopy).includes(name)) {
        formDataCopy[name] = value;
      }

      return formDataCopy;
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const updatedFields = {};

      if (formData.title) updatedFields.title = formData.title;
      if (formData.kit_name) updatedFields.kit_name = formData.kit_name;
      if (formData.sculptor) updatedFields.sculptor = formData.sculptor;
      if (formData.size) updatedFields.size = formData.size;
      if (formData.type) updatedFields.type = formData.type;
      if (formData.weight) updatedFields.weight = formData.weight;
      if (formData.age_range) updatedFields.age_range = formData.age_range;
      if (formData.authenticity_card)
        updatedFields.authenticity_card = formData.authenticity_card;
      if (formData.price) updatedFields.price = formData.price;
      if (formData.shipping_fees)
        updatedFields.shipping_fees = formData.shipping_fees;
      if (formData.localization)
        updatedFields.localization = formData.localization;
      if (formData.belly_plate)
        updatedFields.belly_plate = formData.belly_plate;
      if (formData.gender) updatedFields.gender = formData.gender;
      if (formData.year) updatedFields.year = formData.year;
      if (formData.eyes) updatedFields.eyes = formData.eyes;
      if (formData.hair) updatedFields.hair = formData.hair;
      if (formData.description)
        updatedFields.description = formData.description;
      if (formData.status) updatedFields.status = formData.status;

      const response = await fetch(
        `http://localhost:3000/admin/product/${updatingProductId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify(updatedFields),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update user.');
      }

      const updatedProduct = await response.json();

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatingProductId
            ? { ...product, ...updatedProduct }
            : product
        )
      );

      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="admin-page">
        <div className="admin-header">Admin dashboard</div>
        <div className="admin-nav">
          <NavLink to="/adminusers" activeClassName="active-link">
            All Users
          </NavLink>
          <NavLink to="/adminshops" activeClassName="active-link">
            All Shops
          </NavLink>
          <NavLink to="/adminproducts" activeClassName="active-link">
            All Products
          </NavLink>

          <NavLink to="/adminorders" activeClassName="active-link">
            All Orders
          </NavLink>
        </div>
      </div>
      <div className="product-card">
        {products.map((product) => (
          <div key={product.id} className="product-info">
            <p>
              <strong>Product id:</strong> {product.id}
            </p>
            <p>
              <strong>Product unique id :</strong> {product.unique_id}
            </p>
            <p>
              <strong>Product title :</strong> {product.title}
            </p>
            <p>
              <strong>Product kit_name :</strong> {product.kit_name}
            </p>
            <p>
              <strong>Product sculptor :</strong> {product.sculptor}
            </p>
            <p>
              <strong>Product size :</strong>
              {product.size}
            </p>
            <p>
              <strong>Product type :</strong> {product.type}
            </p>
            <p>
              <strong>Product weight :</strong> {product.weight}
            </p>
            <p>
              <strong>Product age range :</strong> {product.age_range}
            </p>
            <p>
              <strong>Product authenticity card :</strong>{' '}
              {product.authenticity_card}
            </p>
            <p>
              <strong>Product price :</strong> {product.price}
            </p>
            <p>
              <strong>Product shipping fees :</strong> {product.shipping_fees}
            </p>
            <p>
              <strong>Product seller id :</strong> {product.seller.id}
            </p>
            <p>
              <strong>Product shop id :</strong> {product.shop_id}
            </p>
            <p>
              <strong>Product location :</strong>{' '}
              {product.Detail_product.localization}
            </p>
            <p>
              <strong>Product belly plate :</strong>{' '}
              {product.Detail_product.belly_plate}
            </p>
            <p>
              <strong>Product gender :</strong> {product.Detail_product.gender}
            </p>
            <p>
              <strong>Product year :</strong> {product.Detail_product.year}
            </p>
            <p>
              <strong>Product eyes :</strong> {product.Detail_product.eyes}
            </p>
            <p>
              <strong>Product hair :</strong> {product.Detail_product.hair}
            </p>
            <p>
              <strong>Product description :</strong>{' '}
              {product.Detail_product.description}
            </p>
            <p>
              <strong>Product status :</strong> {product.Detail_product.status}
            </p>
            {showImages && <img src={product.Media[0].photo} alt="product" />}

            <button id="show_img" type="button" onClick={handleShowImages}>
              {showImages ? 'Masquer les images' : 'Afficher les images'}
            </button>

            <div className="product-actions">
              <button type="button" onClick={() => handleEditProduct(product)}>
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Edit product</Modal.Header>
        <form onSubmit={handleUpdateProduct}>
          <Modal.Content className="modale">
            {selectedProduct && (
              <>
                <p>
                  <strong>User id:</strong> {selectedProduct.id}
                  <strong>Product unique id:</strong>{' '}
                  {selectedProduct.unique_id}
                  <strong>Shop id :</strong> {selectedProduct.shop_id}
                  <strong>Seller id:</strong> {selectedProduct.seller_id}
                </p>
                <label htmlFor="updatedShopName">
                  Product title
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product kit_name
                  <input
                    type="text"
                    name="kit_name"
                    id="kit_name"
                    value={formData.kit_name}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product sculptor
                  <input
                    type="text"
                    name="sculptor"
                    id="sculptor"
                    value={formData.sculptor}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product size
                  <input
                    type="text"
                    name="size"
                    id="size"
                    value={formData.size}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product type
                  <input
                    type="text"
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product weight
                  <input
                    type="text"
                    name="weight"
                    id="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product age range
                  <input
                    type="text"
                    name="age_range"
                    id="age_range"
                    value={formData.age_range}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product authenticity card
                  <input
                    type="text"
                    name="authenticity_card"
                    id="authenticity_card"
                    value={formData.authenticity_card}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product price
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product shipping fees
                  <input
                    type="text"
                    name="shipping_fees"
                    id="shipping_fees"
                    value={formData.shipping_fees}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product localization
                  <input
                    type="text"
                    name="localization"
                    id="localization"
                    value={formData.localization}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product belly plate
                  <input
                    type="text"
                    name="belly_plate"
                    id="belly_plate"
                    value={formData.belly_plate}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product gender
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product year
                  <input
                    type="text"
                    name="year"
                    id="year"
                    value={formData.year}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product eyes
                  <input
                    type="text"
                    name="eyes"
                    id="eyes"
                    value={formData.eyes}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product hair
                  <input
                    type="text"
                    name="hair"
                    id="hair"
                    value={formData.hair}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product description
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  Product status
                  <input
                    type="text"
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleChange}
                  />
                </label>
              </>
            )}
          </Modal.Content>
          <Modal.Actions className="modale">
            <Button style={{ backgroundColor: 'green' }} primary>
              Update product
            </Button>
            <Button secondary onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </Modal.Actions>
        </form>
      </Modal>
    </div>
  );
}
