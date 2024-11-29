
import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { useSelector } from "react-redux";
import UserOptions from "..//Header/UserOptions";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faHome, faUser, faClone, faComment, faPhone, faCaretDown, faSignInAlt, faUserPlus, faSignOutAlt, faHamburger } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const headerRef = useRef(null);
  const hamBurgerMenu = useRef(null);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {

    const mainWrapper = document.querySelector('.main-wrapper');

    const hamBurgerMenuClick = () => {
      console.log('hamburgermenu clicked==', mainWrapper)
      mainWrapper.classList.toggle("active");
    }

    hamBurgerMenu.current.addEventListener('click', hamBurgerMenuClick)

    // Hide navbar while scrolling down
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll < lastScroll) {
        headerRef.current.classList.remove('hidden');
      } else {
        headerRef.current.classList.add('hidden');
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      hamBurgerMenu.current.removeEventListener('click', hamBurgerMenuClick)
    };
  }, [lastScroll]);

  return (
    <header ref={headerRef}>
      <img className="logo" href="#" src={`${process.env.PUBLIC_URL}/images/logoDeeDev.svg`} alt="Logo" />
      {isAuthenticated && <UserOptions user={user} />}
      <nav className="nav">
        <ul className="nav_list">
          <li>
            <a href="/">
              {/* <FontAwesomeIcon icon={faHome} className="icon-margin-right" /> */}
              Home
            </a>
          </li>
          <li>
            <a href="/products">
              {/* <FontAwesomeIcon icon={faUser} className="icon-margin-right" /> */}
              Products
            </a>
          </li>
          <li>
            <a href="/about">
              {/* <FontAwesomeIcon icon={faClone} className="icon-margin-right" /> */}
              About
            </a>
          </li>
          <li>
            <a href="/contact">
              {/* <FontAwesomeIcon icon={faPhone} className="icon-margin-right" /> */}
              Contact
            </a>
          </li>
          {isAuthenticated ? (
            <li>
              {/* <UserOptions user={user} /> */}
              </li>
          ) : (
              <li id="loggedIn">
                <a href="/login">
                  {/* <FontAwesomeIcon icon={faSignInAlt} className="icon-margin-right" /> */}
                  Log In
                </a>
            </li>
          )}
        </ul>
      </nav>

      <div ref={hamBurgerMenu} className="hamburger-menu">
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;

