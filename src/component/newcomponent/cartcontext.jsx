import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from session storage or initialize as an empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update session storage whenever cartItems change
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: Math.max(1, item.quantity + 1) } // Ensure min 50
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }]; // Set min 50 for new item
    });
  };

  const updateQuantity = (_id, quantity) => {
    const newQuantity = Math.max(1, quantity); // Ensure minimum 50

    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item._id === _id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (_id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item._id !== _id));

    // Also remove from session storage
    const updatedCart = cartItems.filter((item) => item._id !== _id);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
