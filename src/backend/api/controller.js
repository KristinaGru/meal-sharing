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

const getMealReview = async (req, res) => {
  try {
    const { meal_id } = req.params;
    const data = await knex('review').where({ meal_id });
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        'message': `review for meal with id ${req.params.meal_id} does not exist`
      });
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const getMealByQuery = async (req, res) => {
  try {
    const queries = {};
    const parameters = [
      'maxPrice',
      'availableReservations',
      'title',
      'dateAfter',
      'dateBefore',
      'limit',
      'sortKey'
    ];
    // Put key value pairs where keys match parameters into queries object
    Object.keys(req.query).forEach((key) => {
      if (parameters.includes(key)) {
        queries[key] = req.query[key];
      }
    });
    if (Object.keys(queries).length === 0) {
      getAllFromTable(req, res, 'meal');
    } else {
      // Helper functions

      function filterByPrice(builder) {
        if (queries.maxPrice > 0) {
          builder.where('price', '<=', queries.maxPrice);
        }
      }

      function filterByTitle(builder) {
        if (typeof queries.title === 'string') {
          builder.where('title', 'like', `%${queries.title}%`);
        }
      }

      function filterByDates(builder) {
        if (
          !isNaN(Date.parse(queries['dateAfter'])) &&
          queries['dateAfter'].length > 7
        ) {
          builder.where('when', '>=', queries['dateAfter']);
        }
        if (
          !isNaN(Date.parse(queries['dateBefore'])) &&
          queries['dateBefore'].length > 7
        ) {
          builder.where('when', '<=', queries['dateBefore']);
        }
      }

      function sortByKey(builder) {
        const sortKeys = ['when', 'max_reservations', 'price'];
        if ('sortKey' in queries && sortKeys.includes(queries['sortKey'])) {
          const sortKey = queries['sortKey'];
          const sortDir = req.query['sortDir'] === 'desc' ? 'desc' : 'asc';
          builder.orderBy(sortKey, sortDir);
        }
      }

      function filterByAvailability(builder) {
        if (queries['availableReservations'].toLowerCase() === 'true') {
          builder
            .having('available_reservations', '>', 0)
            .orHavingNull('available_reservations');
        } else if (queries['availableReservations'].toLowerCase() === 'false') {
          builder.having('available_reservations', '<=', 0);
        }
      }

      function limit() {
        return 'limit' in queries && queries['limit'] > 0
          ? queries['limit']
          : Number.MAX_SAFE_INTEGER;
      }

      // Main query

      const baseQuery = knex('meal')
        .select(
          'meal.*',
          knex.raw(
            '(meal.max_reservations - sum(reservation.number_of_guests)) AS available_reservations'
          )
        )
        .leftJoin('reservation', 'meal.id', '=', 'reservation.meal_id')
        .groupBy('meal.id');

      const meals = baseQuery
        .modify(filterByPrice)
        .modify(filterByTitle)
        .modify(filterByDates)
        .modify(sortByKey)
        .modify(filterByAvailability)
        .limit(limit());

      res.status(200).json(await meals);
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
  deleteById,
  getMealByQuery,
  getMealReview
};
