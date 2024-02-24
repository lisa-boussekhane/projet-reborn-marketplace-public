import { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken) {
      fetch(`http://localhost:3000/user/${storedUserId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Something went wrong');
          }
          return res.json();
        })
        .then(() => {
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error.message);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>

      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
