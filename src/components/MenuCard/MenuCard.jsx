import React from "react";
import "./MenuCard.css";
import { AiFillHeart } from "react-icons/ai";
import {trunc, truncate} from 'lodash';
import { useNavigate } from "react-router-dom";
import Heart from "../Heart/Heart";

const MenuCard = ({ card }) => {

  const navigate = useNavigate();

  return (
    <div className="flexColStart r-card"
    onClick={()=>navigate(`../menuitem/${card.id}`)}
    
    >
     <Heart id={card?.id}/>
      <img src={card.image} alt="items" />

      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span>
        <span>{card.price}</span>
      </span>

      <span className="primaryText">{truncate(card.name, {length: 15})}</span>
      <span className="secondaryText">{truncate(card.description, {length: 80})}</span>
    </div>
  );
};

export default MenuCard;
