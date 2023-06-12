const express = require('express');
const router = express.Router();
const knex = require('../database');

router.get('/', async (req, res) => {
  try {
    const meals = await knex('meal');
    res.status(200).json(meals);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const input = req.body;
    await knex('meal').insert(input);
    res.status(201).json({ 'message': `${input.title} added successfuly` });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const meal = await knex('meal').where(req.params);
    if (meal.length > 0) {
      res.status(200).json(meal);
    } else {
      res
        .status(404)
        .json({ 'message': `Meal with id ${req.params.id} does not exist` });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const mealId = req.params;
    const meal = await knex('meal').where(mealId);
    if (meal.length > 0) {
      await knex('meal').where(mealId).update(req.body);
      res
        .status(201)
        .json({ 'message': `Meal with id ${mealId.id} updated successfuly` });
    } else {
      res
        .status(404)
        .json({ 'message': `Meal with id ${mealId.id} does not exist` });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const mealId = req.params;
    const meal = await knex('meal').where(mealId);
    if (meal.length > 0) {
      await knex('meal').where(mealId).del();
      res
        .status(200)
        .json({ 'message': `Meal with id ${mealId.id} deleted successfuly` });
    } else {
      res
        .status(404)
        .json({ 'message': `Meal with id ${mealId.id} does not exist` });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;
