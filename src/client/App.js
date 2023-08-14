import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MealsList from './components/MealsList';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import MealPage from './components/MealPage';
import MainPage from './components/MainPage';
import axios from 'axios';

function App() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    async function getMeals() {
      const meals = await axios.get('http://localhost:3000/api/meals');
      setMeals(meals.data);
    }
    getMeals().catch(console.error);
  }, []);

  return (
    <Router>
      <Header />
      <Route exact path="/">
        <MainPage meals={meals.slice(0, 5)} />
      </Route>
      <Route exact path="/meals">
        <MealsList meals={meals} />
      </Route>
      <Route exact path="/meals/:id">
        <MealPage meals={meals} />
      </Route>
    </Router>
  );
}

export default App;
