import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import HeadBod from "./HeadBod";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.73390&lng=76.78890&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setListOfRestaurants(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false)
    return (
      <h1 className="offline-heading text-center text-red-600 font-semibold">
        Looks like you are offline...
      </h1>
    );

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <HeadBod />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mt-8 space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className="px-4 py-2 w-80 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchText}
              placeholder="Search any Restaurant, item"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
              onClick={() => {
                const filteredRestaurants = listOfRestaurants.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredRestaurant(filteredRestaurants);
              }}
            >
              Search
            </button>
          </div>
          
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
            onClick={() => {
              const filterList = listOfRestaurants.filter(
                (res) => res.info.avgRating > 4.5
              );
              setFilteredRestaurant(filterList);
            }}>
               Top Rated Restaurants
               </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Body;
