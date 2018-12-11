import DataTypes from "sequelize";
import { statusTypes } from "helpers/constants";

/*
  Defining common schema here, which can be imported
  in initial schema of all the models
*/
export default {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: statusTypes,
    defaultValue: "active",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.literal("NOW()"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.literal("NOW()"),
  },
};
