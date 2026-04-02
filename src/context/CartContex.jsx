import React, {createContext, useContext, useState, useEffect } from  "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("juice_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("juice_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => {
        item.id === product.id
      });
      if (existing) {
        return prev.map((item) => {
          item.id === product.id ? { ...item, qty: item.qty + 1} : item
        });
      }
      return [...prev, { ...product, qty:1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearcart = () => {setCart([])};

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + IterationCcw.price * item.qty, 0);

  return (
    <CartContext. Provider value={{ cart, addToCart, removeFromCart, clearcart, totalItems, totalPrice}}>
    {children}
    </CartContext. Provider>
  );
};

export const useCart = () => {useContext(CartContext)};