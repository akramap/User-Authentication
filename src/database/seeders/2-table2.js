// Actual pluralized table name in db
const dbTableName = "Tables2s";

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
          name: "Rajeev",
          email: "rajeev@cartoonmango.com",
          username: "rajveer",
        },
      ],
      {},
    ),
  down: queryInterface => queryInterface.bulkDelete(dbTableName, null, {}),
};
