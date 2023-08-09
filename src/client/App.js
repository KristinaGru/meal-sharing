import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MealsList from './components/MealsList';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import MealPage from './components/MealPage';

function App() {
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
    <Router>
      <Header />
      <Route exact path="/">
        <p>test</p>
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
