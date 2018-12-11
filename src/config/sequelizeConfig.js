import config from "@config";
const dbConfig = config.database;

module.exports = {
  host: dbConfig.host,
  username: dbConfig.username,
  password: dbConfig.password,
  port: dbConfig.port,
  database: dbConfig.database,
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
};
