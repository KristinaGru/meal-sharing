import React from 'react';
import { useEffect, useState } from 'react';
import Meal from './Meal';

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch('http://localhost:3000/api/meals');
      const meals = await res.json();
      setMeals(meals);
    }
    fetchMeals().catch(console.error);
  }, []);

  return (
    <ul>
      {meals.map((meal) => (
        <Meal key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default MealsList;
