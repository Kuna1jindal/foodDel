/* eslint-disable no-unused-vars */
import Shimmer_menu from "./Shimmer_menu";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import PropTypes from 'prop-types';
import RestaurantCategory from "./RestaurantCategory";
const RestaurantMenu = ({showAlert}) => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) {
    console.log("running");
    return <Shimmer_menu />;
  }
  const categories = resInfo.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  return (
    <div className="flex flex-wrap">
      {categories.map((category, index) => (
        <RestaurantCategory
          resId={resId}
         
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showAlert={showAlert}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};
RestaurantMenu.propTypes={
  showAlert:PropTypes.func
}
export default RestaurantMenu;
