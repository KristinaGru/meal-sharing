import React from 'react';
import ReviewStars from './ReviewStars';

const Meal = ({ meal }) => {
  return (
    <li className="meal">
      <div className="meal-img">
        <img src={`https://source.unsplash.com/random?${meal.title}`} />
      </div>
      <h3>{meal.title}</h3>
      <ReviewStars meal={meal} />
      <p>{meal.description}</p>
      <h6>{meal.price}DKK</h6>
    </li>
  );
};

export default Meal;
