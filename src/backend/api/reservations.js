const express = require('express');
const router = express.Router();
const {
  getAllFromTable,
  addToTable,
  getById,
  updateById,
  deleteById
} = require('./controller.js');

router.get('/', (req, res) => getAllFromTable(req, res, 'reservation'));
router.post('/', (req, res) => addToTable(req, res, 'reservation'));
router.get('/:id', (req, res) => getById(req, res, 'reservation'));
router.put('/:id', (req, res) => updateById(req, res, 'reservation'));
router.delete('/:id', (req, res) => deleteById(req, res, 'reservation'));

module.exports = router;
