import React from 'react'
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Companies from "../components/Companies/Companies";
import MenuItems from "../components/MenuItems/MenuItems";
import Value from "../components/Value/Value";
import Contact from "../components/Contact/Contact";
import GetStarted from "../components/GetStarted/GetStarted";
import Footer from "../components/Footer/Footer";

const Website = () => {
  return (
    <div className="App">
  
    <Hero />
    <Companies />
    <MenuItems />
    <Value />
    <Contact />
    <GetStarted />
  
  </div>
  )
}

export default Website;