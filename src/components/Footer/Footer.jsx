import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <section className="f-wrapper">
        <div className="paddings innerWidth flexCenter f-container">


          {/* left side */}
          <div className="flexColStart f-left">
            <img src="./hotellogo.jpg" alt='logo' width={120}/>

            <span className='secondaryText'>
              Our vision is to make all people <br/>
              the best food to choose for them...
            </span>
          </div>

          {/* right side */}

          <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">Ashoka Garden 80 Feet road Bhaopal </span>
          <div className="flexCenter f-menu">
            <span>MenuItem</span>
            <span>Contact us</span>
            <span>Our Value</span>
            <span>Get start</span>
          </div>
        </div>





        </div>
    </section>
  )
}

export default Footer