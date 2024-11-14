import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext(null);

export const CartLength = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <CartContext.Provider value={{ count, setCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Define prop types for CartLength
CartLength.propTypes = {
  children: PropTypes.node.isRequired,
};
