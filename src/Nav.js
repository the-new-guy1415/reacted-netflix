import React, { useEffect, useState } from "react";
import "./Nav.css";

const Nav = () => {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/150px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />

      <img
        className="nav_avatar"
        src="https://github.com/CleverProgrammers/pwj-netflix-clone/blob/master/assets/profile__logo.png?raw=true"
        alt="Netflix Avatar"
      />
    </div>
  );
};

// if(window.scrollY > 100){
//   handleShow(true);
//    } else handleShow(false);
export default Nav;
