import { FilterErrorAndThrow } from "helpers";
import validator from "./validator";
import service from "./service";

/**
 * Get record
 * @property {string} params.id - record Id.
 * @returns {Object}
 */
// eslint-disable-line
async function get(params) {
  // Validating param
  const validParam = await validator.get.validate({ params });

  const { id } = validParam.params;

  // Getting record details
  const existingRec = await service.findById({ id });

  // Throwing error if promise response has any error object
  FilterErrorAndThrow(existingRec);

  return existingRec;
}

/**
 * Get records list.
 * @property {number} query.skip - Number of records to be skipped.
 * @property {number} query.limit - Limit number of records to be returned.
 * @property {array} query.sortBy - keys to use to record sorting.
 * @returns {Object}
 */
async function list(query) {
  // Validating query
  const validQuery = await validator.list.validate({ query });

  // Getting record list with filters
  const records = await service.find({ query: validQuery.query });
  return records;
}

/**
 * Create new record
 * @property {string} body.name - The name of record.
 * @property {string} body.email - The email of record.
 * @property {string} body.username - The username of record.
 * @returns {Object}
 */
async function create(body) {
  // Validating body
  const validData = await validator.create.validate({ body });

  const validBody = validData.body;

  // TODO: Validate body, if anything needs to be checked with model

  // Creating new record
  const newRec = await service.create({ data: validBody });

  // Throwing error if promise response has any error object
  FilterErrorAndThrow(newRec);

  return newRec;
}

/**
 * Update existing record
 * @property {string} params.id - record Id.
 * @property {string} body.name - The name of record.
 * @property {string} body.email - The email of record.
 * @property {string} body.username - The username of record.
 * @returns {Object}
 */
async function update(params, body) {
  // Validating param
  const validParam = await validator.update.validate({ params });

  const { id } = validParam.params;

  // Getting record object to be updated
  const existingRec = await service.findById({ id, autoFormat: false });

  // Throwing error if promise response has any error object
  FilterErrorAndThrow(existingRec);

  // Validating body
  const validData = await validator.update.validate({ body });

  const validBody = validData.body;

  // TODO: Validate body, if anything needs to be checked with model

  // Updating new data to record
  const savedRec = await service.updateExisting({
    existingRec,
    data: validBody,
  });

  // Throwing error if promise response has any error object
  FilterErrorAndThrow(savedRec);

  return savedRec;
}

/**
 * Delete record.
 * @property {string} params.id - record Id.
 * @returns {Object}
 */
async function remove(params) {
  // Validating param
  const validParam = await validator.remove.validate({ params });

  const { id } = validParam.params;

  // Updating status to deleted
  const deletedRec = await service.removeById({ id });

  // Throwing error if promise response has any error object
  FilterErrorAndThrow(deletedRec);

  return deletedRec;
}

export default { get, list, create, update, remove };
