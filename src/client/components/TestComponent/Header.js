import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <div className="header">
      <a href="/">
        <div className="logo">
          <FontAwesomeIcon icon={faUtensils} /> MEAL SHARING
        </div>
      </a>
      <ul>
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
      </ul>
    </div>
  );
};

export default Header;
