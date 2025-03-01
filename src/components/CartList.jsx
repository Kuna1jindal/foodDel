/* eslint-disable react/prop-types */
import delImage from '../assets/del.png';
import { CartContext } from '../utils/cartLength';
import { useContext } from 'react';
const ItemList = ({ item, showAlert, setItems, items,setPrice,price }) => {
const {count,setCount}=useContext(CartContext);
  const handleDel = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/services/deleteone/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json(); // Parse response if needed
        console.log("Response:", data);

        // Show success alert
        showAlert(data.message, "success");
       setCount(count-1);
        setPrice(price-data.itemData.price/100);
        // Remove the item from the list dynamically
        setItems(items.filter((item) => item._id !== id)); // Dynamically update state
      } else {
        const errorData = await response.json();
        showAlert(errorData.message || "An error occurred", "warning");
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("Failed to connect to the server", "danger");
    }
  };

  return (
    <>
      <div className="flex justify-center my-8">
        <div
          className="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-lg transform transition duration-500 hover:scale-105"
          style={{
            border: "1px solid #e2e8f0", // Light border color
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Softer shadow
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Image Section */}
            <div className="relative flex-shrink-0 mb-6 md:mb-0">
              <img
                className="w-40 h-40 rounded-xl object-cover shadow-md"
                src={item.imageURL}
                alt={item.name}
              />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow ml-0 md:ml-8">
              <h2 className="font-poppins font-extrabold text-2xl text-gray-800 mb-2">
                {`${item.name}`}
              </h2>

              <p className="font-poppins font-medium text-lg text-gray-600 mb-4">
                {item.description}
              </p>

              {/* Price and Quantity Section */}
              <div className="flex justify-between items-center mt-4">
                {/* Price Display */}
                <span className="font-poppins font-semibold text-xl text-gray-700">
                  ₹
                  {item.price
                    ? (item.price / 100).toFixed(2)
                    : (item.defaultPrice / 100).toFixed(2)}
                </span>

                {/* Quantity Display */}
                <div className="flex items-center space-x-3">
                  <span className="font-poppins font-semibold text-xl text-gray-700">
                    Quantity:
                  </span>
                  <span className="text-green-500 font-bold text-xl">
                    {item.qty}
                  </span>
                </div>
              </div>
            </div>
            <img
              src={delImage}
              alt="Delete Item"
              height="30"
              width="30"
              style={{ position: "relative", top: "-86px", right: "-11px" }}
              onClick={() => { handleDel(item._id); }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemList;
