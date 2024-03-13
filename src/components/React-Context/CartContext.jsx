import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [productIds, setProductIds] = useState([]);

  const addToCart = (product, productId) => {
    const isProductInCart = productIds.includes(productId);

    if (!isProductInCart) {
      setCart((prevCart) => [...prevCart, { ...product, id: productId }]);
      setProductIds((prevIds) => [...prevIds, productId]);
    }
  };
  console.log(cart);
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    setProductIds((prevIds) => prevIds.filter((id) => id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setProductIds([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, productIds, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
