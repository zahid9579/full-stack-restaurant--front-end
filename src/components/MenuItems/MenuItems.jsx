import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./MenuItems.css";
import data from "../../utils/slider.json";
import { sliderSettings } from "../../utils/common";
import MenuCard from "../MenuCard/MenuCard";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";

const MenuItems = () => {
  
  const {data, isError, isLoading} = useProperties();

   
  if(isError){
    return(
      <div className="wrapper">
        <span> Error while fetching the data</span>
      </div>
    )
   }

   if(isLoading){
    return(
      <div className="wrapper flexCenter" style={{height: "60vh"}}>
        <PuffLoader 
        height="80"
        width="80"
        radius={1}
        color="#4066ff"
        aria-label="puff-loading"/>

      </div>
    )
  }
  


  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best choices</span>
          <span className="primaryText">Popular Items</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtons />
          {/* slider  */}
          {data.slice(0, 8).map((card, i) => (
            <SwiperSlide key={i}>
              <MenuCard  card={card}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MenuItems;


const SliderButtons = () => {
  const swiper = useSwiper();
  return(
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
