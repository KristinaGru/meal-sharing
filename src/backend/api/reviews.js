const express = require('express');
const {
  getAllFromTable,
  addToTable,
  getById,
  updateById,
  deleteById
} = require('./controller.js');
const router = express.Router();

router.get('/', (req, res) => getAllFromTable(req, res, 'review'));
router.post('/', (req, res) => addToTable(req, res, 'review'));
router.get('/:id', (req, res) => getById(req, res, 'review'));
router.put('/:id', (req, res) => updateById(req, res, 'review'));
router.delete('/:id', (req, res) => deleteById(req, res, 'review'));

module.exports = router;
