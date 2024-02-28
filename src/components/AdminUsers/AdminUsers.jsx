import './AdminUsers.scss';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'semantic-ui-react';

export default function AdminUsers() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const storedToken = localStorage.getItem('jwtToken');
  const [formData, setFormData] = useState({
    name: selectedUser ? selectedUser.name : '',
    first_name: selectedUser ? selectedUser.first_name : '',
    last_name: selectedUser ? selectedUser.last_name : '',
    username: selectedUser ? selectedUser.username : '',
    email: selectedUser ? selectedUser.email : '',
    date_of_birth: selectedUser ? selectedUser.date_of_birth : '',
    phone: selectedUser ? selectedUser.phone : '',
    address: selectedUser ? selectedUser.address : '',
    zip_code: selectedUser ? selectedUser.zip_code : '',
    city: selectedUser ? selectedUser.city : '',
    state: selectedUser ? selectedUser.state : '',
    role: selectedUser ? selectedUser.role : '',
    pro: selectedUser ? selectedUser.pro : '',
    duns: selectedUser ? selectedUser.duns : '',
  });

  useEffect(() => {
    if (userRole !== 'Admin') {
      setErrorMessage('You do not have the permissions to access this page.');

      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users.');
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [navigate, userRole, storedToken]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch('http://localhost:3000/admin/user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete product.');
      }

      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUpdatingUserId(user.id);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      // Utilisez Object.keys() pour obtenir les clés de l'objet
      const formDataCopy = { ...prevFormData };

      // Vérifiez si la clé existe avant de mettre à jour
      if (Object.keys(formDataCopy).includes(name)) {
        formDataCopy[name] = value;
      }

      return formDataCopy;
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const updatedFields = {};

      if (formData.first_name) updatedFields.first_name = formData.first_name;
      if (formData.last_name) updatedFields.last_name = formData.last_name;
      if (formData.username) updatedFields.username = formData.username;
      if (formData.email) updatedFields.email = formData.email;
      if (formData.date_of_birth)
        updatedFields.date_of_birth = formData.date_of_birth;
      if (formData.phone) updatedFields.phone = formData.phone;
      if (formData.address) updatedFields.address = formData.address;
      if (formData.zip_code) updatedFields.zip_code = formData.zip_code;
      if (formData.city) updatedFields.city = formData.city;
      if (formData.state) updatedFields.state = formData.state;
      if (formData.role) updatedFields.role = formData.role;
      if (formData.pro) updatedFields.pro = formData.pro;
      if (formData.duns) updatedFields.duns = formData.duns;

      const response = await fetch(
        `http://localhost:3000/admin/user/${updatingUserId}`,
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

      const updatedUser = await response.json();

      // Mettez à jour localement l'utilisateur mis à jour dans la liste des utilisateurs
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatingUserId ? { ...user, ...updatedUser } : user
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
        {errorMessage && <p>{errorMessage}</p>}
        {userRole === 'Admin' && (
          <>
            <div className="admin-header">Admin dashboard</div>
            <div className="admin-nav">
              <NavLink to="/adminusers" activeClassName="active-link">
                All Users
              </NavLink>
              <NavLink to="/adminshops" activeClassName="active-link">
                All Shops
              </NavLink>
              <NavLink to="/adminproducts" activeClassName="active-link">
                {' '}
                All Products
              </NavLink>
              <NavLink to="/adminorders" activeClassName="active-link">
                All Orders
              </NavLink>
            </div>
          </>
        )}
      </div>
      <div className="user-card">
        {errorMessage && <p>{errorMessage}</p>}
        {userRole === 'Admin' && (
          <>
            {users.map((user) => (
              <div key={user.id} className="user-info">
                <p>
                  <strong>User id:</strong> {user.id}
                </p>
                <p>
                  <strong>User first_name :</strong> {user.first_name}
                </p>
                <p>
                  <strong>User last_name :</strong> {user.last_name}
                </p>
                <p>
                  <strong>User username :</strong> {user.username}
                </p>
                <p>
                  <strong>User email :</strong> {user.email}
                </p>
                <p>
                  <strong>User date of birth :</strong>
                  {user.date_of_birth}
                </p>
                <p>
                  <strong>User phone :</strong> {user.phone}
                </p>
                <p>
                  <strong>User adress :</strong> {user.adress}
                </p>
                <p>
                  <strong>User zip_code :</strong> {user.zip_code}
                </p>
                <p>
                  <strong>User city :</strong> {user.city}
                </p>
                <p>
                  <strong>User state :</strong> {user.state}
                </p>
                <p>
                  <strong>User role :</strong> {user.role}
                </p>
                <p>
                  <strong>User pro :</strong> {user.pro}
                </p>
                <p>
                  <strong>User duns :</strong> {user.duns}
                </p>
                <div className="user-actions">
                  <button type="button" onClick={() => handleEditUser(user)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Edit user</Modal.Header>
        <form onSubmit={handleUpdateUser}>
          <Modal.Content className="modale">
            {selectedUser && (
              <>
                <p>
                  <strong>User id:</strong> {selectedUser.id}
                </p>
                <label htmlFor="updatedShopName">
                  User first name
                  <input
                    type="text"
                    name="first_name"
                    id="first name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User last name
                  <input
                    type="text"
                    name="last_name"
                    id="last name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User username
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User email
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User date of birth
                  <input
                    type="text"
                    name="date_of_birth"
                    id="date of birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User phone
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User address
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User zip code
                  <input
                    type="text"
                    name="zip_code"
                    id="zip code"
                    value={formData.zip_code}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User city
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User state
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User role
                  <input
                    type="text"
                    name="role"
                    id="role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User pro
                  <input
                    type="text"
                    name="pro"
                    id="pro"
                    value={formData.pro}
                    onChange={handleChange}
                  />
                </label>
                <label htmlFor="updatedShopName">
                  User duns
                  <input
                    type="text"
                    id="duns"
                    name="duns"
                    value={formData.duns}
                    onChange={handleChange}
                  />
                </label>
              </>
            )}
          </Modal.Content>
          <Modal.Actions className="modale">
            <Button style={{ backgroundColor: 'green' }} primary>
              Update user
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
