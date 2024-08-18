import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useLocation } from "react-router-dom";
import { getMenu, buyItem, removeOrder } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import "./Menu.css";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailContext.js";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart.jsx";

const Menu = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isLoading, isError } = useQuery(["menu", id], () =>
    getMenu(id)
  );

  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, orders },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate, isLoading: isOrdering } = useMutation({
    mutationFn: () => buyItem(id, user?.email, token),
    onSuccess: () => {
      toast.success("You have ordered your item", {
        position: "bottom-right",
      });
      setUserDetails((prev) => ({
        ...prev,
        orders: [...prev.orders, { id }],
      }));
    },
    onError: ({ response }) => toast.error(response.data.message),
  });

  {
    /* for cancel order */
  }
  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeOrder(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        orders: prev.orders.filter((booking) => booking?.id !== id),
      }));
      toast.success("Booking cancelling", { position: "bottom-right" });
    },
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching menu item details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* Like button */}
        <div className="like">
          <Heart id={id}/>
       
        </div>
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.name}</span>
              <span className="orangeText" style={{ font: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1f3e72" />
                <span>{data?.facilities.parkings} Parkings</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}
            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}{""} {data?.city} {""} {data?.country}
              </span>
            </div>

            {/* order now */}
            {orders?.map((order) => order.id).includes(id) ? (
              <Button
                variant="outline"
                w={"100%"}
                color="red"
                onClick={() => cancelBooking()}
                disabled={cancelling}
              >
                <span>Cancel Order</span>
              </Button>
            ) : (
              <button
                className="button"
                onClick={() => {
                  if (validateLogin()) mutate();
                }}
                disabled={isOrdering}
              >
                {isOrdering ? "Ordering..." : "Order Now"}
              </button>
            )}
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={data?.address} 
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
