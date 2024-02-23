import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    console.log('Stored token:', storedToken);

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res.json();
      })
      .then((userData) => {
        setUser(userData);
        setToken(storedToken);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error('Error fetching user info:', error.message);
        // En cas d'erreur, déconnecter l'utilisateur
        // logout(); // Vous devriez avoir une fonction logout définie quelque part
        // // Rediriger vers la page de connexion
        // navigate('/login');
      });
  }, [user]);

  const login = (receivedToken, userData) => {
    setIsLoggedIn(true);
    setToken(receivedToken);
    setUser(userData);
  };

  // ...

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, token, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
