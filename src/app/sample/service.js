import models from "database";
import commonService from "helpers/services";

/**
 * Finding records with provided query params
 * @property {object} query - object containing params to prepare query.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {records[]}
 */
async function find({ query, autoFormat = true }) {
  const res = await commonService.find({
    Model: models.Table1,
    query,
    autoFormat,
  });
  return res;
}

/**
 * Finding record with id
 * @property {string} id - record id.
 * @property {string} errKey - key for which error object will be generated.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function findById({ id, errKey, autoFormat = true }) {
  const res = await commonService.findById({
    Model: models.Table1,
    id,
    errKey,
    autoFormat,
  });
  return res;
}

/**
 * Creating record
 * @property {object} data - record properties.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function create({ data, autoFormat = true }) {
  const res = await commonService.create({
    Model: models.Table1,
    data,
    autoFormat,
  });
  return res;
}

/**
 * Updating record
 * @property {object} data - record properties.
 * @property {record} existingRec - record which needs to be updated.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function updateExisting({ data, existingRec, autoFormat = true }) {
  const res = await commonService.updateExisting({
    data,
    existingRec,
    autoFormat,
  });
  return res;
}

/**
 * Updating record
 * @property {object} data - record properties.
 * @property {object} filterCriteria - criteria to fetch record to be updated.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function update({ data, filterCriteria, autoFormat = true }) {
  const res = await commonService.update({
    Model: models.Table1,
    data,
    filterCriteria,
    autoFormat,
  });
  return res;
}

/**
 * Pseudo delete record
 * @property {string} id - record id to be removed.
 * @property {boolean} autoFormat - false if formatted output not needed.
 * @returns {record}
 */
async function removeById({ id, autoFormat = true }) {
  const res = await commonService.removeById({
    Model: models.Table1,
    id,
    autoFormat,
  });
  return res;
}
export default {
  find,
  findById,
  create,
  update,
  updateExisting,
  removeById,
};
