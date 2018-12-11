import DataTypes from "sequelize";
// Importing common schema for all the table
import baseSchema from "src/database/baseSchema";

/*
  Defining initial schema in one file which can be
  imported in model and migration both
*/
export default {
  ...baseSchema,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};
