const knex = require('../database');

const getAllFromTable = async (req, res, table) => {
  try {
    const data = await knex(table);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const addToTable = async (req, res, table) => {
  try {
    const input = req.body;
    await knex(table).insert(input);
    res.status(201).json({ 'message': `${table} added successfuly` });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const getById = async (req, res, table) => {
  try {
    const { id } = req.params;
    const data = await knex(table).where({ id });
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        'message': `${table} with id ${{ id }.id} does not exist`
      });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const updateById = async (req, res, table) => {
  try {
    const { id } = req.params;
    const data = await knex(table).where({ id });
    if (data.length > 0) {
      await knex(table).where({ id }).update(req.body);
      res.status(201).json({
        'message': `${table} with id ${{ id }.id} updated successfuly`
      });
    } else {
      res.status(404).json({
        'message': `${table} with id ${{ id }.id} does not exist`
      });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const deleteById = async (req, res, table) => {
  try {
    const { id } = req.params;
    const data = await knex(table).where({ id });
    if (data.length > 0) {
      await knex(table).where({ id }).del();
      res.status(200).json({
        'message': `${table} with id ${{ id }.id} deleted successfuly`
      });
    } else {
      res
        .status(404)
        .json({ 'message': `${table} with id ${{ id }.id} does not exist` });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

module.exports = {
  getAllFromTable,
  addToTable,
  getById,
  updateById,
  deleteById
};
