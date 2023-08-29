import React, { useEffect, useState } from 'react';
import Meal from './Meal';
import axios from 'axios';
import FilterMeals from './FilterMeals';

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  const fetchMeals = async (
    title,
    sortKey,
    sortDir,
    maxPrice,
    minPrice,
    availableReservations,
    dateAfter,
    dateBefore
  ) => {
    try {
      const res = await axios.get(
        `api/meals?title=${title}&sortKey=${sortKey}&sortDir=${sortDir}&maxPrice=${maxPrice}&minPrice=${minPrice}&availableReservations=${availableReservations}&dateAfter=${dateAfter}&dateBefore=${dateBefore}`
      );
      setMeals(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <FilterMeals fetchMeals={fetchMeals} />
      <ul className="flex-list">
        {meals.length > 0 ? (
          meals.map((meal) => <Meal key={meal.id} meal={meal} />)
        ) : (
          <p>No meals...</p>
        )}
      </ul>
    </>
  );
};

export default MealsList;
