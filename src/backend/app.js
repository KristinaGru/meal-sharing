const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const mealsRouter = require('./api/meals');
const reservationsRouter = require('./api/reservations');
const reviewsRouter = require('./api/reviews');
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
router.use('/reservations', reservationsRouter);
router.use('/reviews', reviewsRouter);

async function getMeals(res, query) {
  try {
    const meals = await knex.raw(query);
    if (meals.length > 1 && meals[0].length > 0) {
      return meals[0];
    } else {
      return [];
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
}

function getResponse(res, arr, statusCode = 200) {
  try {
    if (statusCode === 404 && arr.length === 0) {
      res.status(404).json('There are no meals');
    } else {
      res.status(statusCode).json(arr);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
}

app.get('/future-meals', async (req, res) => {
  const meals = await getMeals(
    res,
    'SELECT * FROM meal WHERE `when` > CURDATE()'
  );
  getResponse(res, meals);
});

app.get('/past-meals', async (req, res) => {
  const meals = await getMeals(
    res,
    'SELECT * FROM meal WHERE `when` < CURDATE()'
  );
  getResponse(res, meals);
});

app.get('/all-meals', async (req, res) => {
  const meals = await getMeals(res, 'SELECT * FROM meal ORDER BY id');
  getResponse(res, meals);
});

app.get('/first-meal', async (req, res) => {
  const meal = await getMeals(
    res,
    'SELECT * FROM meal ORDER BY id ASC LIMIT 1'
  );
  getResponse(res, meal, 404);
});

app.get('/last-meal', async (req, res) => {
  const meal = await getMeals(
    res,
    'SELECT * FROM meal ORDER BY id DESC LIMIT 1'
  );
  getResponse(res, meal, 404);
});

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
