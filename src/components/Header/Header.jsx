import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddMenuItemModal from "../AddMenuItemModal/AddMenuItemModal";
import useAuthCheck from "../../hooks/useAuthCheck"

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const [modalOpened, setModalOpened] = useState(false);
  const {validateLogin} = useAuthCheck()
  const handleAddMenuItemClick = () => {
      if(validateLogin()){
        setModalOpened(true);
      }
  }

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };



  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        {/* logo */}
        <Link to="/">
          <img src="./hotellogo.jpg" alt="logo" width={100} />
        </Link>

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/menuitem">MenuItem</NavLink>
            <a href="mailto: kamalzahid636@gmail.com">Contact</a>

            {/* add property */}
            <div onClick={ handleAddMenuItemClick}> Add MenuItems</div>
            <AddMenuItemModal opened={modalOpened} setOpened={setModalOpened} />

            {/* Login button */}
            {!isAuthenticated ? (
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
            ) : (
              <ProfileMenu user={user} logout={logout} />
            )}
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
