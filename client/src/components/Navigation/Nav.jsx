import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/userSlice";
import Logout from "../User/Logout";
import AppSVG from "../Logos/AppSVG";
import animateGlobalText from "../Logos/GlobalAnimation";
import reverseGlobalText from "../Logos/ReverseAnimation";
import React, { useEffect, useRef, useState } from "react";
import "./Nav.scss";

const Nav = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();

  const [menuOpen, setMenuOpen] = useState(false);
  const refHamburger = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (refHamburger && !refHamburger.current.contains(e.target)) {
        // a click has occurred outside of the hamburger menu, close it.
        setMenuOpen(false);
      }
    };
    const handleResize = (e) => {
      setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = (e) => {
    if (menuOpen) {
      refHamburger && refHamburger.current.blur();
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <nav>
      <div
        onMouseEnter={() => {
          animateGlobalText(ref1, ref2, ref3);
        }}
        onMouseLeave={() => {
          reverseGlobalText(ref1, ref2, ref3);
        }}
      >
        <AppSVG ref1={ref1} ref2={ref2} ref3={ref3} />
      </div>
      <div className="nav-menu">
        <div className="nav-hamburger" tabIndex={0} ref={refHamburger} onClick={handleMenuClick}>
          <div></div>
        </div>
        <div className={menuOpen ? "nav-links nav-links-show" : "nav-links"}>
          <div className="nav-links-links">
            <Link to="/menu">Menu</Link>
            <Link to="/shopping-list">Shopping List</Link>
            <Link to="/map">Map</Link>
            <Link to="/search">Search</Link>
          </div>
          <Logout />
        </div>
      </div>
    </nav>
  );
};
export default Nav;
