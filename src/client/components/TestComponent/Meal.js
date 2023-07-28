import React from 'react';

const Meal = ({ meal }) => {
  return (
    <li>
      <h4>{meal.title}</h4>
      <p>
        {meal.description} | {meal.price}DKK
      </p>
    </li>
  );
};

export default Meal;
