import { MENU_IMG_API } from "../utils/constants";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { CartContext } from "../utils/cartLength";

const ItemList = ({ items, resId, showAlert }) => {
  const { count, setCount } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: value,
    }));
  };

  const handleAddItem = async (item) => {
    const quantity = quantities[item.card.info.id] || 1;

    try {
      const response = await fetch("http://localhost:5000/api/services/addtocart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: `${localStorage.getItem("authtoken")}`,
        },
        body: JSON.stringify({
          name: item.card.info.name,
          description: item.card.info.description,
          price: item.card.info.price || item.card.info.defaultPrice,
          imageURL: MENU_IMG_API + item.card.info.imageId,
          qty: quantity,
          resId: resId,
        }),
      });

      if (response.ok) {
        const token = await response.json();
        showAlert(token.message, "success");
        setCount(count + 1);
      } else {
        showAlert("Failed to add item to cart.", "error");
      }
    } catch (error) {
      console.error(error);
      showAlert("Error adding item to cart.", "error");
    }
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <li
            key={item.card.info.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-3 flex flex-col items-center">
              {/* Image */}
              <div className="w-full h-28 mb-3">
                <img
                  src={MENU_IMG_API + item.card.info.imageId}
                  alt={item.card.info.name}
                  className="w-full h-full object-cover rounded-t-md"
                />
              </div>

              {/* Item Details */}
              <h3 className="font-semibold text-sm text-gray-800 text-center">
                {item.card.info.name}
              </h3>
              <p className="text-gray-600 text-xs mt-1 text-center line-clamp-2">
                {item.card.info.description || "No description available"}
              </p>
              <div className="text-teal-600 font-semibold text-sm mt-1">
                ₹{(item.card.info.price || item.card.info.defaultPrice) / 100}
              </div>

              {/* Quantity and Add Button */}
              <div className="flex items-center justify-between w-full mt-3">
                <input
                  type="number"
                  value={quantities[item.card.info.id] || 1}
                  min="1"
                  max="10"
                  onChange={(e) =>
                    handleQuantityChange(item.card.info.id, parseInt(e.target.value, 10))
                  }
                  className="w-12 text-center border rounded-md py-1 text-sm"
                />
                <button
                  onClick={() => handleAddItem(item)}
                  className={`bg-teal-500 text-white text-xs font-medium px-3 py-1 rounded-md hover:bg-teal-600 transition-transform ${
                    localStorage.getItem("authtoken")
                      ? "hover:scale-105"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!localStorage.getItem("authtoken")}
                >
                  Add
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ItemList.propTypes = {
  showAlert: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  resId: PropTypes.string.isRequired,
};

export default ItemList;
