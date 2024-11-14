/* eslint-disable react/prop-types */
import { MENU_IMG_API } from "../utils/constants";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { CartContext } from "../utils/cartLength";

const ItemList = ({ items, resId, showAlert }) => {
  const { count, setCount } = useContext(CartContext);
  
  // State to handle quantity for each item
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  const handleAddItem = async (item) => {
    let quantity = quantities[item.card.info.id] || 1; // Default to 1 if no quantity selected
    // Adding Item to the Cart
   
    const response = await fetch('http://localhost:5000/api/services/addtocart', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authtoken": `${localStorage.getItem('authtoken')}`,
      },
      body: JSON.stringify({
        name: item.card.info.name,
        description: item.card.info.description,
        price: item.card.info.price ||item.card.info.defaultPrice,
        imageURL: MENU_IMG_API + item.card.info.imageId,
        qty: quantity,
        resId: resId,
      }),
    });

    if (response.ok) {
      const token = await response.json();
      showAlert(token.message, 'success');
      setCount(count + 1); // Update cart count
    }
  };
  return (
    <div className="my-12">
      <ul>
        <li>
          {items.map((item) => (
            <div
            className="w-5/6 p-6 h-auto flex flex-nowrap mx-auto justify-between mt-8 bg-white rounded-3xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            style={{ border: "1px solid #e0e0e0" }}
            key={item.card.info.id}
            >
              {/* Item Name */}
            
              <div className="font-poppins font-extrabold text-2xl m-2 text-gray-900">
                {item.card.info.name}
              </div>

              {/* Item Description */}
              <div className="font-poppins font-medium text-xl m-2 text-gray-700 w-[400px] text-ellipsis overflow-hidden">
                {item.card.info.description}
              </div>

              {/* Item Price */}
              <div>
                <div className="font-poppins font-medium text-xl m-2 text-gray-900">
                  ₹
                  {item.card.info.price / 100
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </div>

                {/* Quantity input */}
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="10"
                  value={quantities[item.card.info.id] || 1}
                  step="1"
                  onChange={(e) =>
                    handleQuantityChange(item.card.info.id, parseInt(e.target.value, 10))
                  }
                  className="w-16 text-center border-2 border-gray-300 rounded-md"
                />
              </div>

              {/* Item Image and Add Button */}
              <div className="flex justify-between items-center p-4">
                <div className="relative">
                  <div className="w-36 h-36">
                    <img
                      className="rounded-3xl w-full h-full object-cover"
                      src={MENU_IMG_API + item.card.info.imageId}
                      alt={item.card.info.name}
                    />
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => handleAddItem(item)}
                    className="absolute top-3/4 left-1/2 transform -translate-x-1/2 text-md px-8 py-3 rounded-xl text-white font-extrabold bg-teal-600 hover:bg-teal-700 hover:scale-105 transition ease-in-out duration-300"
                    hidden={localStorage.getItem("authtoken") == null}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          ))}
        </li>
      </ul>
    </div>
  );
};

ItemList.propTypes = {
  showAlert: PropTypes.func,
};

export default ItemList;
