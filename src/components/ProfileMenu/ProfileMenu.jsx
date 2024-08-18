import React from 'react';
import { Avatar, Menu } from '@mantine/core';
import './ProfileMenu.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate()

  return (
   
    <Menu className="menu">
      <Menu.Target>
        <Avatar 
          src={user?.picture} 
          alt="user image" 
          radius="xl" 
          className="avatar" // Apply the avatar class
        />
      </Menu.Target>
      <Menu.Dropdown className="menu-dropdown">
        <Menu.Item className="menu-item" onClick={() => navigate("./favourites", {replace:true})}>
          Favourites
        </Menu.Item>
        <Menu.Item className="menu-item" onClick={() => navigate("./orders", {replace:true})}>
          Orders
        </Menu.Item>
        <Menu.Item 
          onClick={() => {
            localStorage.clear();
            logout();
          }}
          className="menu-item menu-item-logout" // Apply menu-item and menu-item-logout classes
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
    
  );
};

export default ProfileMenu;
