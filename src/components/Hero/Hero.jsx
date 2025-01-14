import React from "react";
import CountUp from "react-countup";
import "./Hero.css";
import SearchBar from "../SearchBar/SearchBar";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <h1>
              Downtown <br />
              Delight <br /> Restaurant
            </h1>
          </div>

          <div className="flexColStart hero-des">
            <span className="secondaryText">
              Find a variety of dining options that suit your taste with ease
            </span>
            <span className="secondaryText">
              Forget all difficulties in finding the perfect restaurant for you.{" "}
            </span>
          </div>

          <SearchBar />

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Meals Served</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Happy Customers</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} />
                <span>+</span>
              </span>
              <span className="secondaryText">Award-Winning Dishes</span>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexCenter right-side">
          <div className="image-container">
            <img src="./heroo.png" alt="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
