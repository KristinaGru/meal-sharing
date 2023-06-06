const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const mealsRouter = require('./api/meals');
const buildPath = path.join(__dirname, '../../dist');
const port = process.env.PORT || 3000;
const cors = require('cors');
const knex = require('./database');

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use('/meals', mealsRouter);

function getMeals(query, status = 200) {
  return async (req, res) => {
    try {
      const meals = await knex.raw(query);
      if (meals.length > 1 && meals[0].length > 0) {
        res.status(200).json(meals[0]);
      } else {
        if (status === 200) {
          res.status(200).json('');
        } else if (status === 404) {
          res.status(404).json('There are no meals');
        }
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  };
}

app.get(
  '/future-meals',
  getMeals('SELECT * FROM meal WHERE `when` > CURDATE()')
);
app.get('/past-meals', getMeals('SELECT * FROM meal WHERE `when` < CURDATE()'));
app.get('/all-meals', getMeals('SELECT * FROM meal ORDER BY id'));
app.get('/first-meal', getMeals('SELECT * FROM meal ORDER BY id LIMIT 1', 404));
app.get(
  '/last-meal',
  getMeals('SELECT * FROM meal ORDER BY id DESC LIMIT 1', 404)
);

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw 'API_PATH is not set. Remember to set it in your .env file';
}

// for the frontend. Will first be covered in the react class
app.use('*', (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
