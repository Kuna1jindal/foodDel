/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    locality,
    areaName,
    avgRating,
    sla,
    cuisines,
  } = resData?.info;

  return (
    <div
      className="h-auto m-4  w-[265px]  bg-white shadow-lg hover:bg-slate-700 hover:text-white hover:shadow-2xl hover:scale-105 transition ease-in-out duration-300 transform"
      style={{ paddingBottom:"1rem",height:"400px",borderRadius:"20px" }}
    >
      {/* Image Section */}
      <img
        className=" h-[200px] w-full object-cover mb-4 p-0"
        style={{ padding: 0,borderTopRightRadius:"20px" ,borderTopLeftRadius:"20px"}}
        src={CDN_URL + cloudinaryImageId}
        alt="Restaurant Logo"
      />

      {/* Content Section */}
      <div className="text-center" style={{padding:"1rem"}}>
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {name.length <= 25
            ? name
            : name.substr(0, name.lastIndexOf(" ", 25)) + "..."}
        </h3>
        <p className="text-md font-semibold text-gray-600">{locality}</p>
        <p className="text-sm text-gray-500 mb-2">{areaName}</p>

        {/* Rating and Delivery Info */}
        <div className="flex justify-center items-center my-2 space-x-4">
          <span className="flex items-center text-yellow-500 font-bold">
            ⭐ {avgRating}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {sla?.slaString}
          </span>
        </div>

        {/* Cuisines List */}
        <p className="text-sm text-gray-500 font-medium mt-3">
          {cuisines.join(", ").length <= 50
            ? cuisines.join(", ")
            : cuisines
                .join(", ")
                .substr(0, cuisines.join(", ").lastIndexOf(" ", 50)) + "..."}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
