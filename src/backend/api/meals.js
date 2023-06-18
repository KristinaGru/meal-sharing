const express = require('express');
const router = express.Router();
const knex = require('../database');
const {
  getAllFromTable,
  addToTable,
  getById,
  updateById,
  deleteById
} = require('./controller');

router.get('/', (req, res) => getAllFromTable(req, res, 'meal'));
router.post('/', (req, res) => addToTable(req, res, 'meal'));
router.get('/:id', (req, res) => getById(req, res, 'meal'));
router.put('/:id', (req, res) => updateById(req, res, 'meal'));
router.delete('/:id', async (req, res) => deleteById(req, res, 'meal'));

module.exports = router;
