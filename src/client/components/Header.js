import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Dialog, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const [openNav, setOpenNav] = useState(false);
  return (
    <div className="header">
      <a href="/">
        <div className="logo">
          <FontAwesomeIcon icon={faUtensils} /> MEAL SHARING
        </div>
      </a>
      {isMobile ? (
        <>
          <IconButton onClick={() => setOpenNav(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
          <Dialog open={openNav} onClose={() => setOpenNav(false)}>
            <div className="mobile-nav">
              <ul>
                <li>
                  <a className="link nav-link" href="/">
                    Home
                  </a>
                </li>
                <li>
                  <a className="link nav-link" href="/meals">
                    Meals
                  </a>
                </li>
                <li>
                  <a className="link nav-link" href="/host">
                    Become a host
                  </a>
                </li>
                <li>
                  <IconButton onClick={() => setOpenNav(false)}>
                    <CloseIcon fontSize="large" color="warning" />
                  </IconButton>
                </li>
              </ul>
            </div>
          </Dialog>
        </>
      ) : (
        <ul className="flex-list">
          <li>
            <a className="link" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="link" href="/meals">
              Meals
            </a>
          </li>
          <li>
            <a className="link" href="/host">
              Become a host
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
