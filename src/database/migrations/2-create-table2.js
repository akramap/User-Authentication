// Importing initial schema
import initialSchema from "src/app/sample/models/table2/schema";

// Actual pluralized table name in db
const dbTableName = "Tables2s";

/*
  to run migrations, follow this steps:
  1. export your NODE_ENV
  2. npm run sequelize db:migrate;
*/
export default {
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  up: queryInterface => queryInterface.createTable(dbTableName, initialSchema),
  /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  down: queryInterface => queryInterface.dropTable(dbTableName),
};
