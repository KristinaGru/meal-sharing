import React from 'react';
import ReviewStars from './ReviewStars';
import { Link } from 'react-router-dom';

const Meal = ({ meal }) => {
  return (
    <>
      <Link to={`/meals/${meal.id}`}>
        <li className="meal">
          <div className="meal-img">
            <img src={`https://source.unsplash.com/random?${meal.title}`} />
          </div>
          <h3>{meal.title}</h3>
          <ReviewStars meal={meal} />
          <p>{meal.description}</p>
          <h6>{meal.price}DKK</h6>
        </li>
      </Link>
    </>
  );
};

export default Meal;
