import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import "../MenuItem/ManuItem.css";
import MenuCard from "../../components/MenuCard/MenuCard";
import UserDetailContext from "../../context/UserDetailContext";

const Favourites = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const {
    userDetails: { favourites },
  } = useContext(UserDetailContext);

  if (isError) {
    return (
      <div className="wrapper">
        <span> Error while fetching the data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {
            // data.map((card, i)=> (<MenuCard card={card} key={i}/>))
            data
              .filter((restaurant) => favourites.includes(restaurant.id))

              .filter(
                (restaurant) =>
                  (restaurant.name &&
                    restaurant.name
                      .toLowerCase()
                      .includes(filter.toLowerCase())) ||
                  restaurant.city
                    .toLowerCase()
                    .includes(filter.toLowerCase()) ||
                  restaurant.country
                    .toLowerCase()
                    .includes(filter.toLowerCase())
              )
              .map((restaurant, i) => (
                <MenuCard card={restaurant} key={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Favourites;
