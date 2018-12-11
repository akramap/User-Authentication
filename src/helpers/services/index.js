import { parseSortBy } from "helpers";
import {
  SUCCESSFULL,
  NOT_FOUND,
  CREATED,
  UPDATED,
  DELETED,
} from "localization/en";

/**
 * Finding records with provided query params
 * @property {object} Model - Sequelize model object.
 * @property {object} query - object containing params to prepare query.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {records[]}
 */
async function find({
  Model,
  query,
  customFilters = false,
  autoFormat = true,
}) {
  const { limit = 50, skip = 0, sortBy } = query;

  // preparing query filters
  let filterCriteria = {
    where: { status: "active" },
    offset: +skip,
    limit: +limit,
    order: parseSortBy(sortBy),
  };

  if (customFilters) {
    filterCriteria = { ...filterCriteria, ...customFilters };
  }

  // Getting records with available filters
  const recs = await Model.findAll(filterCriteria);

  // Returning formatted response if autoFormat true
  if (autoFormat) {
    return {
      status: 200,
      data: recs,
      message: SUCCESSFULL,
    };
  }

  // Otherwise returned db object
  return recs;
}

/**
 * Finding record with id
 * @property {object} Model - Sequelize model object.
 * @property {string} id - record id.
 * @property {string} errKey - key for which error object will be generated.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function findById({ Model, id, errKey, autoFormat = true }) {
  // Getting record with id
  const existingRec = await Model.findOne({
    where: {
      id,
      status: "active",
    },
  });

  // Returning rec if exist
  if (existingRec !== null) {
    // Returning formatted response if autoFormat true
    if (autoFormat) {
      return {
        status: 200,
        data: existingRec,
        message: SUCCESSFULL,
      };
    }

    // Otherwise returned db object
    return existingRec;
  }

  // Returning error obj if does not exist
  const errObj = {
    error: {
      status: 404,
      message: NOT_FOUND,
    },
  };
  if (errKey) {
    errObj.error.data = [
      {
        [errKey]: NOT_FOUND,
      },
    ];
  }
  return errObj;
}

/**
 * Creating record
 * @property {object} Model - Sequelize model object.
 * @property {object} data - record properties.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function create({ Model, data, autoFormat = true }) {
  // Creating new record
  const newRec = new Model(data);
  const savedRec = await newRec.save();

  // Returning formatted response if autoFormat true
  if (autoFormat) {
    return {
      status: 201,
      data: savedRec,
      message: CREATED,
    };
  }

  // Otherwise returned db object
  return savedRec;
}

/**
 * Updating record
 * @property {object} data - record properties.
 * @property {record} existingRec - record which needs to be updated.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function updateExisting({ data, existingRec, autoFormat = true }) {
  // Updating existing record with new data
  if (data) {
    existingRec.set(data);
  }
  const savedRec = await existingRec.save();

  // Returning error obj if does not exist
  if (savedRec === null) {
    return {
      error: {
        status: 404,
        message: NOT_FOUND,
      },
    };
  }

  // Returning formatted response if autoFormat true
  if (autoFormat) {
    return {
      status: 200,
      data: savedRec,
      message: UPDATED,
    };
  }

  // Otherwise returned db object
  return savedRec;
}

/**
 * Updating record
 * @property {object} Model - Sequelize model object.
 * @property {object} data - record properties.
 * @property {object} filterCriteria - criteria to fetch record to be updated.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function update({ Model, data, filterCriteria, autoFormat = true }) {
  // Getting and updating record
  const savedRec = await Model.update(data, { where: filterCriteria });

  // Returning error obj if does not exist
  if (savedRec[0] === 0) {
    return {
      error: {
        status: 404,
        message: NOT_FOUND,
      },
    };
  }

  // If records found and updated

  // Returning formatted response if autoFormat true
  if (autoFormat) {
    return {
      status: 200,
      message: UPDATED,
    };
  }

  // Otherwise returned db object
  return savedRec;
}

/**
 * Pseudo delete record
 * @property {object} Model - Sequelize model object.
 * @property {string} id - record id to be removed.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function removeById({ Model, id, autoFormat = true }) {
  // Getting and updating record with status=deleted
  const filterCriteria = { id, status: "active" };
  const deletedRec = await update({
    Model,
    filterCriteria,
    data: { status: "deleted" },
  });

  // Returning error returned from update method
  if (deletedRec.error) {
    return deletedRec;
  }

  // Returning formatted response if autoFormat true
  if (autoFormat) {
    return {
      status: 200,
      message: DELETED,
    };
  }

  // Otherwise returned db object
  return deletedRec;
}

export default {
  find,
  findById,
  create,
  update,
  updateExisting,
  removeById,
};
