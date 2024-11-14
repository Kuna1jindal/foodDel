/* eslint-disable react/prop-types */
const ItemList = ({ item }) => {
  return (
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
                ₹{item.price ? (item.price / 100).toFixed(2) : (item.defaultPrice / 100).toFixed(2)}
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
          
        </div>
      </div>
    </div>
  );
};

export default ItemList;
