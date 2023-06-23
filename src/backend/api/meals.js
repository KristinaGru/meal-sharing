const express = require('express');
const router = express.Router();
const knex = require('../database');
const {
  addToTable,
  getById,
  updateById,
  deleteById,
  getMealByQuery,
  getMealReview
} = require('./controller');

router.get('/', (req, res) => getMealByQuery(req, res));
router.post('/', (req, res) => addToTable(req, res, 'meal'));
router.get('/:id', (req, res) => getById(req, res, 'meal'));
router.put('/:id', (req, res) => updateById(req, res, 'meal'));
router.delete('/:id', (req, res) => deleteById(req, res, 'meal'));
router.get('/:meal_id/reviews', (req, res) => getMealReview(req, res));

module.exports = router;
