import { useState } from "react";
import ItemList from "./ItemList";
import PropTypes from "prop-types";

const RestaurantCategory = ({ data, resId, showAlert }) => {
  // State to handle the visibility of the item list
  const [showItems, setShowItems] = useState(false);

  const handleClick = () => {
    setShowItems(!showItems); // Toggle the visibility
  };

  return (
    <div className="flex-col w-full">
      <div className="mx-4 md:mx-20">
        <div
          className="flex-col justify-between w-full cursor-pointer overflow-hidden h-auto my-6 rounded-2xl bg-white shadow-lg hover:shadow-2xl transform transition duration-300 ease-in-out p-6"
        >
          {/* Title and Arrow */}
          <div className="flex justify-between items-center w-full mb-4">
            <span className="text-2xl font-extrabold text-slate-900">
              {data.title} ({data.itemCards.length})
            </span>
            {/* Arrow icon changes based on visibility */}
            <span
              className={`text-3xl transform transition duration-300 ease-in-out ${
                showItems ? "rotate-180" : ""
              }` }
              onClick={handleClick}
            >
              🔽
            </span>
          </div>

          {/* Conditional rendering of ItemList based on showItems */}
          {showItems && (
            <ItemList items={data.itemCards} resId={resId}  showAlert={showAlert} />
          )}
        </div>
      </div>
    </div>
  );
};

RestaurantCategory.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    itemCards: PropTypes.array.isRequired,
  }).isRequired,
  resId: PropTypes.string.isRequired,
  showAlert: PropTypes.func.isRequired,
};

export default RestaurantCategory;
