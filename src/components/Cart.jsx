import CartList from "./CartList.jsx";
import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../utils/cartLength.jsx";

const Cart = ({ showAlert }) => {
  const counterState = useContext(CartContext);
  const [cart, setCart] = useState([]); // useState to store cart data
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price

  useEffect(() => {
    fetch(`http://localhost:5000/api/services/showcart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authtoken": `${localStorage.getItem("authtoken")}`,
      },
    })
      .then(async (response) => {
        console.log(response.status);
         if(!response.ok){
          return await response.json().then((data) => {
            showAlert(data.error, "danger");
          });
        }
        else {
          return await response.json().then((data) => {
            setCart(data); // update cart state
            calculateTotal(data); // Calculate the total price
            counterState.setCount(data.length);
          });
        }
      })
      .catch((error) => {
        // console.log(response.status);
        showAlert("PLease Log in first", "warning");
        console.error("Fetch error:", error);
      });
  }, []); 

  const handleClearCart = async () => {
    setCart([]);
    counterState.setCount(0);
    const response = await fetch(`http://localhost:5000/api/services/deleteall`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authtoken": `${localStorage.getItem("authtoken")}`,
      },
    });
    if (response.ok) {
      const token = await response.json();
      console.log(token.message);
      showAlert(token.message, "success");
    }
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((acc, item) => {
      return acc + (item.price / 100) * item.qty; // Total price calculation
    }, 0);
    setTotalPrice(total);
  };

  const handleProceedToCheckout = () => {
    // Logic for proceeding to checkout
    showAlert("Proceeding to checkout", "success");
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="font-bold text-5xl text-[#000]">Cart</h1>
      <div className="w-3/4 ml-40">
        {cart.length === 0 && (
          <h1 className="font-bold text-slate-700 text-xl">
            Cart is empty. Please add items to the cart.
          </h1>
        )}
        {cart.map((item) => (
          <CartList key={item._id} item={item} showAlert={showAlert} items={cart} setItems={setCart} price={totalPrice} setPrice={setTotalPrice}/>
        ))}

        {/* Display Total Price */}
        {cart.length !== 0 && (
          <div className="mt-8 text-2xl font-bold text-gray-800">
            <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
          </div>
        )}

        {/* Clear Cart Button */}
        {cart.length !== 0 && (
          <div className="mt-6 flex justify-between items-center">
            <button
              className="styled-button px-6 text-xl py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition duration-300"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button
              className="styled-button px-6 text-xl py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition duration-300"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Cart.propTypes = {
  showAlert: PropTypes.func.isRequired, // Mark as required if it's essential for functionality
};

export default Cart;
