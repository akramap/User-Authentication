// Actual pluralized table name in db
const dbTableName = "Table1s";

/*
  Seeds are used to insert some initial data
  to add seeds, follow this steps:
  1. export your NODE_ENV
  2. npm run sequelize db:seed:all;
*/
export default {
  up: queryInterface =>
    queryInterface.bulkInsert(
      dbTableName,
      [
        {
          name: "Rajeeb",
          email: "raj@cartoonmango.com",
          username: "rajesh",
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete(dbTableName, null, {}),
};
