import React from 'react';
import { useEffect, useState } from 'react';
import Meal from './Meal';

const MealsList = ({ meals }) => {
  return (
    <ul>
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default MealsList;
